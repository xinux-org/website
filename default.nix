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
      # Create output directory
      # mkdir -p $out

      # Move all contents
      cp -r ./out $out
    '';

    pnpmDeps = pkgs.pnpm.fetchDeps {
      pname = manifest.name;
      version = manifest.version;
      src = source;
      hash = "sha256-qfeRcQcpS02+bTlSoj2IBj2YD06y7L8P1M6l+QMj8OQ=";
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
