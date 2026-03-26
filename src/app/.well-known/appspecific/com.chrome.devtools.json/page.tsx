export const dynamic = "force-static";

export default function ChromeDevToolsProbePage() {
  return <pre>{JSON.stringify({}, null, 2)}</pre>;
}
