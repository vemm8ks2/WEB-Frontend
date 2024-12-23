import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/ui/Loader";

interface Props {
  title: string;
  Icon: React.ReactElement;
  mainText: string;
  subText: string;
  isLoading?: boolean;
}

const OverviewCard = ({ title, Icon, mainText, subText, isLoading }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loader className="text-zinc-400 mx-auto" />
        ) : (
          <>
            <div className="text-2xl font-bold">{mainText}</div>
            <p className="text-xs text-muted-foreground">{subText}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
