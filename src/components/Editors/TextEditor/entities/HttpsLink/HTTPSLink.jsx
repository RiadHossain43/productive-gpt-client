export default function HTTPSLink(props) {
  return (
    <a
      href={props.decoratedText}
      title={props.decoratedText}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
}
