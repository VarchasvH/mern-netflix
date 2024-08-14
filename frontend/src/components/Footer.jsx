const Footer = () => {
  return (
    <footer className='py-6 md:px-8 md:py-0 bg-zinc-900 text-white border-t border-zinc-600'>
      <div className='flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row'>
        <p className='text-balance text-center text-sm leading-loose text-muted-foreground md:text-left'>
          Built by{" "}
          <a
            href='https://github.com/varchasvh'
            target='_blank'
            className='font-medium underline underline-offset-4'
          >
            Varchasv Hoon
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
export default Footer;
