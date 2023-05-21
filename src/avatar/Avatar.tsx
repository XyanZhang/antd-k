export interface AvatarProps {
  src: string;
  alt: string;
  title?: string;
}

export default function Avatar(props: AvatarProps): JSX.Element {
  return (
    <div className="avatar">
      <img src={props.src} alt={props.alt} title={props.title} />
    </div>
  );
};