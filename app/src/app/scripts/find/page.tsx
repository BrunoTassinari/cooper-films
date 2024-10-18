"use client";

import FindScriptForm from "@/components/find-script";
import type { Script } from "@/types/script";
import { useEffect, useState } from "react";

export default function FindScripts() {
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    console.log(scripts);
  }, [scripts]);

  return (
    <div className="flex flex-col gap-4">
      <FindScriptForm setScripts={setScripts} />

      {scripts.length ? (
        <div className="flex flex-col gap-4">
          {scripts.map((script) => (
            <div key={script.id}>{JSON.stringify(script)}</div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
