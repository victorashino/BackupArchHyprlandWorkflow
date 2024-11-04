import { ExtractProvider } from "@/src/context/ExtractContext";

const ExtractPage: React.FC = () => {
    return (
      <ExtractProvider>
        <ExtractPage />
      </ExtractProvider>
    );
  };