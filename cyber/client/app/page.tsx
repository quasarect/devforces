import RecentAlerts from "@/components/Dashboard/RecentAlerts";
// import RunTests from "@/components/Dashboard/RunTests";
import Security from "@/components/Dashboard/Security";

export default function Home() {
  return (
    <div className="relative top-0 flex-1 w-full flex flex-col gap-10 h-full px-4 pt-4">
      <Security />
      {/* <RunTests /> */}
      <RecentAlerts />
    </div>
  );
}
