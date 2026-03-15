import DetailsLabelCard from "@/features/label/components/details-label-card";
import AppRouterBack from "@/shared/components/app-router-back";

export default function DetailsLabelPageLayout() {
	return (
		<div className="flex-1 min-h-svh px-4 py-3 pt-20 md:pt-0 flex items-center justify-center flex-col">
			<div className="flex items-start w-full mb-2">
				<AppRouterBack />
			</div>
			<DetailsLabelCard />
		</div>
	);
}
