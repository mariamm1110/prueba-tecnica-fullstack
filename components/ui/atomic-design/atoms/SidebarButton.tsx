import Link from "next/link";
import { useRouter } from "next/router";

export default function SidebarButton({
    label,
    href,
}: {
    label: string;
    href: string;
}) {
    const router = useRouter();
    const isActive = router.pathname === href;

    return(
        <Link href={href}>
          <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            {label}
          </div>
        </Link>
    );
}