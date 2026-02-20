# xinux.uz

The official website of [Xinux](https://xinux.uz).

## Local Development

### With Nix (Xinux/NixOS or Nix package manager)

Make sure flakes are enabled (already enabled on Xinux). If not, add this to your `configuration.nix` or `flake.nix`:

```nix
nix.settings.experimental-features = [ "nix-command" "flakes" ];
```

**Enter the dev shell** (automatically runs `pnpm install` and sets up `PATH`):

```bash
nix develop
```

**Start the dev server:**

```bash
pnpm dev
```

The site will be available at `http://localhost:3000`.

**Build the Nix package** (produces a static export in `./result/` folder):

```bash
nix build
```

### Without Nix

**Install dependencies:**

```bash
pnpm install
```

**Start dev server:**

```bash
pnpm dev
```

The site will be available at `http://localhost:3000`.

**Build for production:**

```bash
pnpm build
```

---
TODO: @orzklv keep identicity of posts before `start-using-home-manager.nix`
