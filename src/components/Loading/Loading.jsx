import { useEffect, useState } from "react";

export default function Loading(props) {
  const [currnet, setcurrent] = useState([]);
  useEffect(() => {
    let interval = setInterval(() => {
      setcurrent((cur) => {
        let ld = cur.filter((v) => v === "•");
        if (ld.length === 1) return ["•", "•", ""];
        if (ld.length === 2) return ["•", "•", "•"];
        if (ld.length === 3) return ["•", "", ""];
        return [];
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return (
    <span {...props}>
      {currnet.map((v) => {
        return v ? v : <span>&nbsp;</span>;
      })}
    </span>
  );
}
