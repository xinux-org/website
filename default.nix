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

    installPhase = let
      bin = pkgs.writeShellScript "xinux-website-start" ''
        cd "$(dirname "$0")/../share/xinux-website"
        exec ${pkgs.lib.getExe pkgs.nodejs_22} ./server.js
      '';
    in ''
      # Copy standalone server output
      mkdir -p $out/share/xinux-website
      cp -r .next/standalone/* $out/share/xinux-website/
      rm -rf $out/share/xinux-website/.next
      mkdir -p $out/share/xinux-website/.next
      cp -r .next/* $out/share/xinux-website/.next/
      cp -r public $out/share/xinux-website/public

      # Create start script
      mkdir -p $out/bin
      cp ${bin} $out/bin/xinux-website-start
    '';

    pnpmDeps = pkgs.pnpm.fetchDeps {
      pname = manifest.name;
      version = manifest.version;
      src = source;
      fetcherVersion = 3;
      hash = "sha256-figV9UFI9nfagLbVJhY3k+Wi9v8K7zhmDkWD76EmCak=";
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
