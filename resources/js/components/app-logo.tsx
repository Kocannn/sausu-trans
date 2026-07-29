export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md  ">

                <img src={`/logo.png`} alt="Logo Desa Sausu Trans" className="h-full w-full object-contain" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Desa Sausu Trans
                </span>
            </div>
        </>
    );
}
