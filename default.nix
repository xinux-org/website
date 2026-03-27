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
      makeWrapper
    ];

    buildInputs = with pkgs; [
      vips
    ];

    buildPhase = ''
      # Build the package
      pnpm build
    '';

    installPhase = ''
      # Create output directory
      mkdir -p $out/share/${manifest.name}

      # Copy standalone server
      cp -r .next/standalone/* $out/share/${manifest.name}/

      # Copy static assets
      mkdir -p $out/share/${manifest.name}/.next
      cp -r .next/static $out/share/${manifest.name}/.next/static

      # Copy public assets
      if [ -d public ]; then
        cp -r public $out/share/${manifest.name}/public
      fi

      # Create start script
      mkdir -p $out/bin
      makeWrapper ${pkgs.nodejs_22}/bin/node $out/bin/${manifest.name}-start \
        --add-flags "$out/share/${manifest.name}/server.js"
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
