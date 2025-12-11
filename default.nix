{
  pkgs ?
    let
      lock = (builtins.fromJSON (builtins.readFile ./flake.lock)).nodes.nixpkgs.locked;
      nixpkgs = fetchTarball {
        url = "https://github.com/nixos/nixpkgs/archive/${lock.rev}.tar.gz";
        sha256 = lock.narHash;
      };
    in
    import nixpkgs { overlays = [ ]; },
  ...
}:
let
  # Manifest data
  manifest = pkgs.lib.importJSON ./package.json;

  # All source codes
  source = ./.;
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
    hash = "sha256-HIHVleWA/EFrfNIR2w/HTJnNZTa7xKhWRjEZKKqYLMY=";
  };

  meta = with pkgs.lib; {
    homepage = "https://xinux.uz";
    mainProgram = "${manifest.name}-start";
    description = "Website of Xinux";
    license = with licenses; [ cc-by-40 ];
    platforms = with platforms; linux ++ darwin;
    maintainers = with maintainers; [ orzklv ];
  };
}
