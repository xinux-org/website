{pkgs ? import <nixpkgs> {}}:
pkgs.stdenv.mkDerivation {
  name = "xinux-website-shell";

  buildInputs = with pkgs; [
    # Package managers
    pnpm
    yarn

    # Runtime engines
    nodejs_22

    # Nextjs dependencies
    vips

    # Nix
    nixd
    statix
    deadnix
    alejandra
  ];

  shellHook = ''
    printf "Installing pnpm dependencies\n"
    pnpm install

    printf "Adding node_modules to PATH\n"
    export PATH="$PWD/node_modules/.bin/:$PATH"

    printf "Adding necessary aliases\n"
    alias scripts='jq ".scripts" package.json'
  '';
}
