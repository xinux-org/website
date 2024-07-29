{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
  buildInputs = [
    pkgs.pnpm
    pkgs.nodejs_22
  ];

  shellHook = ''
    echo "Yippe! Entered Nix development environment..."
  '';
}
