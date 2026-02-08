import NavLinkItem from '@/app/components/common/NavLinkItem';

export default function UnauthenticatedLinks() {
  return (
    <>
      <NavLinkItem href="/auth/login">Sign In</NavLinkItem>
      <NavLinkItem href="/auth/register">Sign Up</NavLinkItem>
    </>
  );
}
