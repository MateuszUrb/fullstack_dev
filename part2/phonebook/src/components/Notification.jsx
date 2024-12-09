export default function Notification({ message, type }) {
  if (message === null) return;
  const style = `${type === "info" ? "notification" : "notification_error"}`;

  return (
    <div className={style}>
      <h1>{message}</h1>
    </div>
  );
}
