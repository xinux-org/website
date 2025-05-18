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

  # Executable
  exec = pkgs.writeShellScript "${manifest.name}-start.sh" ''
    # Change working directory to script
    cd "$(dirname "$0")/../lib"

    # Start the stadalone server
    ${pkgs.lib.getExe pkgs.nodejs} ./server.js
  '';
in
  pkgs.stdenv.mkDerivation {
    pname = manifest.name;
    version = manifest.version;

    src = source;

    nativeBuildInputs = [
      pkgs.nodejs_22
      pkgs.pnpm.configHook
      pkgs.typescript
    ];

    buildPhase = ''
      # Set to standalone mode and properties
      sed -i 's/output: "export",/output: "standalone",/' ./packages/docs/next.config.mjs
      sed -i 's/unoptimized: true,/unoptimized: false,/' ./packages/docs/next.config.mjs

      # Build the package
      pnpm build
    '';

    installPhase = ''
      # Create output directory
      mkdir -p $out

      ls -la ./
      ls -la ./packages/docs

      # Copy standalone as library
      cp -r ./packages/docs/.next/standalone $out/lib

      # Create filler folders
      mkdir -p $out/lib/.next

      # Copy static contents
      if [ -d "./packages/docs/.next/static" ]; then
        cp -R ./packages/docs/.next/static $out/lib/.next/static
      fi

      # Copy public assets
      if [ -d "./packages/docs/public" ]; then
        cp -R ./packages/docs/public $out/lib/public
      fi

      # Create executable directory
      mkdir -p $out/bin

      # Copy shell script to executables
      cp -r ${exec} $out/bin/${manifest.name}-start
    '';

    pnpmDeps = pkgs.pnpm.fetchDeps {
      pname = manifest.name;
      version = manifest.version;
      src = source;
      hash = "sha256-2g8+3OTDaEkx0NvSxnUYyPQ1PEdRmc8xjc2qHMWJe+w=";
    };

    meta = with pkgs.lib; {
      homepage = "https://xinux.uz";
      mainProgram = "${manifest.name}-start";
      description = "Website of Xinux";
      license = with licenses; [cc-by-40];
      platforms = with platforms; linux ++ darwin;
      maintainers = with maintainers; [orzklv];
    };
  }
