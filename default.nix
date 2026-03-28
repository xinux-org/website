{
  pkgs ? let
    lock = (builtins.fromJSON (builtins.readFile ./flake.lock)).nodes.nixpkgs.locked;
    nixpkgs = fetchTarball {
      url = "https://github.com/nixos/nixpkgs/archive/${lock.rev}.tar.gz";
      sha256 = lock.narHash;
    };
  in
    import nixpkgs {overlays = [];},
  ...
}: let
  # Manifest data
  manifest = pkgs.lib.importJSON ./package.json;

  # All source codes
  source = ./.;
in
  pkgs.stdenv.mkDerivation {
    pname = manifest.name;
    version = manifest.version;

    src = source;

    nativeBuildInputs = with pkgs; [
      nodejs_22
      pnpm.configHook
      typescript
    ];

    buildInputs = with pkgs; [
      vips
    ];

    buildPhase = ''
      # Build the package
      pnpm build
    '';

    installPhase = ''
      # Copy standalone server output
      mkdir -p $out/share/xinux-website
      # Copy standalone server
      cp -r .next/standalone/* $out/share/xinux-website/
      # Copy full .next over standalone's partial .next
      rm -rf $out/share/xinux-website/.next
      mkdir -p $out/share/xinux-website/.next
      cp -r .next/* $out/share/xinux-website/.next/
      cp -r public $out/share/xinux-website/public

      # Create start script
      mkdir -p $out/bin
      cat > $out/bin/xinux-website-start <<SCRIPT
      #!${pkgs.bash}/bin/bash
      export PORT="\''${1:-3000}"
      export HOSTNAME="0.0.0.0"
      cd $out/share/xinux-website
      exec ${pkgs.nodejs_22}/bin/node $out/share/xinux-website/server.js
      SCRIPT
      chmod +x $out/bin/xinux-website-start
    '';

    pnpmDeps = pkgs.pnpm.fetchDeps {
      pname = manifest.name;
      version = manifest.version;
      src = source;
      hash = "sha256-xKWfyWob2KC/B98gwqVVvbvDvhO6ro7g8qHRlmCSDI8=";
    };

    meta = with pkgs.lib; {
      homepage = "https://xinux.uz";
      mainProgram = "${manifest.name}-start";
      description = "The official website of Xinux";
      license = with licenses; [cc-by-40];
      platforms = with platforms; linux ++ darwin;
      maintainers = with maintainers; [orzklv];
    };
  }
