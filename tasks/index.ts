#!/usr/bin/env bun
import { program } from "commander"
import {dirname, join} from "path"

program.command("version")
  .description("sync the version from package.json -> manifest.json")
  .action(async ()=> {
    const pkgLocation = import.meta.env.npm_package_json as string
    const manifestLocation = join(dirname(pkgLocation), "manifest.json")
    const pkg = await Bun.file(pkgLocation).json()
    const manifest = await Bun.file(manifestLocation).json()
    console.log("syncing manifest.json@%s -> package.json@%s", manifest.version, pkg.version)
    manifest.version = pkg.version
    Bun.write(manifestLocation, JSON.stringify(manifest, null, 2))
  })

program.parse()