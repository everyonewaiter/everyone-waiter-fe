import ClientModalWrapper from "../(main)/_components/ClientModalWrapper";

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ClientModalWrapper>{modal}</ClientModalWrapper>
    </>
  );
}
