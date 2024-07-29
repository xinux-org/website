{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_22
    pkgs.nodePackages.pnpm
  ];

  shellHook = ''
    echo "Yippe! Entered Nix development environment..."
  '';
}
