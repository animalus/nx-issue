# Nx Issue

## Setup

```sh
npm run setup
```

## Running

Both libs `admin` and `gps` depend on `core`. Both are angular libraries. `admin` builds fine, `gps` does not.

```sh
npx nx build admin
```

```sh
npx nx build gps

------------------------------------------------------------------------------
Building entry point '@animalus/gps'
------------------------------------------------------------------------------
✖ Compiling with Angular sources in Ivy full compilation mode.

 NX   libs/gps/src/gps.service.ts:2:31 - error TS2307: Cannot find module '@animalus/core' or its corresponding type declarations.


2 import { BaseDirective } from "@animalus/core";
                                ~~~~~~~~~~~~~~~~
```

## Troubleshooting

```sh
node compare_libs.mjs admin gps
```
