import Link from 'next/link';

const Navigation = () => {
  return (
    <header className="flex justify-between px-[1.6rem] py-[0.8rem]">
      <h1 title="GOVEN MINI" className="inline-flex w-[166px]">
        <Link href="/">
          <img src="/goven-mini.png" alt="GOVEN MINI" />
        </Link>
      </h1>
    </header>
  );
};

export default Navigation;
