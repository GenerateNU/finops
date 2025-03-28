export function DebugBlock({ snippet }: { snippet: string | object | [] }) {
  return (
    <div className="p-4 mx-auto w-full bg-slate-100 rounded-md">
      <pre className="text-xs break-all whitespace-pre-wrap">
        {JSON.stringify(snippet, null, 2)}
      </pre>
    </div>
  );
}
