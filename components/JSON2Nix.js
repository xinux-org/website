import React from "react"
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode"
import { linter } from '@codemirror/lint';
import { json5, json5ParseLinter } from 'codemirror-json5';
import { nix } from "@replit/codemirror-lang-nix";
import { StreamLanguage } from "@codemirror/language"
import { toml } from "@codemirror/legacy-modes/mode/toml"
import { yaml } from "@codemirror/lang-yaml";
import JSON5 from "json5"
import YAML from "yaml"
import TOML from "smol-toml"

function json2nix(json, d = 0) {
  const lines = [];
  const indent = (n) => "  ".repeat(n);

  if (json === null) return "null";

  if (Array.isArray(json)) {
    lines.push("[");
    for (const item of json)
      lines.push(`${indent(d + 1)}${json2nix(item, d + 1)}`);
    lines.push(`${indent(d)}]`);
    return lines.join("\n");
  }

  if (typeof json === "object") {
    lines.push("{");
    for (const [k, v] of Object.entries(json)) {
      const key = /^[a-zA-Z_][a-zA-Z0-9_'-]*$/.test(k) ? k : `"${k}"`;
      lines.push(`${indent(d + 1)}${key} = ${json2nix(v, d + 1)};`);
    }
    lines.push(`${indent(d)}}`);
    return lines.join("\n");
  }

  if (typeof json === "string")
    return `"${json.replaceAll('"', '\\"').replaceAll('${', '$\\{')}"`;

  if (typeof json === "number" || typeof json === "boolean")
    return String(json);

  return `"UNSUPPORTED"`;
}

const initialContent = {
  bahrom: true,
  bobosher: {
    notes: 1
  },
  shaxzod: ["qudratov", { telegram: "@shakhzodme" }],
}

export default function JSON2Nix({ type = "json" }) {
  const [jsonValue, setJsonValue] = React.useState(JSON.stringify(initialContent, null, 2))
  const [tomlValue, setTomlValue] = React.useState(TOML.stringify(initialContent))
  const [yamlValue, setYamlValue] = React.useState(YAML.stringify(initialContent))
  const [nixValue, setNixValue] = React.useState(json2nix(initialContent))

  const onChange = React.useCallback((type) => (value) => {
    switch (type) {
      case "json":
        setJsonValue(value)
        break
      case "toml":
        setTomlValue(value)
        break
      case "yaml":
        setYamlValue(value)
        break
    }

    try {
      switch (type) {
        case "json":
          setNixValue(json2nix(JSON5.parse(value)))
          break
        case "toml":
          setNixValue(json2nix(TOML.parse(value)))
          break
        case "yaml":
          setNixValue(json2nix(YAML.parse(value)))
          break
      }
    } catch (e) {
      console.error("failed to parse", e)
    }

  }, [setJsonValue, setNixValue])

  return <div>
    {type == "json" && (
      <div>
        <h2>JSON:</h2>
        <CodeMirror theme={vscodeDark} value={jsonValue} onChange={onChange("json")} extensions={[json5(), linter(json5ParseLinter())]} />
      </div>
    )}

    {type == "toml" && (
      <div>
        <h2>TOML:</h2>
        <CodeMirror theme={vscodeDark} value={tomlValue} onChange={onChange("toml")} extensions={[StreamLanguage.define(toml)]} />
      </div>
    )}

    {type == "yaml" && (
      <div>
        <h2>YAML:</h2>
        <CodeMirror theme={vscodeDark} value={yamlValue} onChange={onChange("yaml")} extensions={[yaml()]} />
      </div>
    )}

    <div>
      <h2>Nix:</h2>
      <CodeMirror theme={vscodeDark} value={nixValue} extensions={[nix()]} />
    </div>
  </div>
}
