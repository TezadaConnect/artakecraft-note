type ErrorFieldCommonProps = {
  error: any;
};

const ErrorFieldCommon = ({ error }: ErrorFieldCommonProps) => {
  return <div className="text-red-600">{error}</div>;
};

export default ErrorFieldCommon;
