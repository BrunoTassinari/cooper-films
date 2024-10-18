import { Button } from "./ui/button";

export default function ButtonActions({ role, item }: any) {
  return (
    <div className="flex gap-4 justify-center">
      {role === "ANALYST" && (
        <>
          <Button variant="secondary" onClick={() => console.log("Validar")}>
            Recusar
          </Button>
          <Button onClick={() => console.log("Validar")}>
            Enviar para revisão
          </Button>
        </>
      )}

      {role === "REVIEWER" && (
        <>
          <Button variant="secondary" onClick={() => console.log("Validar")}>
            Recusar
          </Button>
          <Button onClick={() => console.log("Validar")}>Validar</Button>
        </>
      )}
    </div>
  );
}
