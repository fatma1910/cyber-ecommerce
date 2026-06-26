const CardSkeleton = () => {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white p-4">
      <div className="aspect-square w-full rounded-xl bg-gray-200" />

      <div className="mt-4 h-3 w-3/4 rounded bg-gray-200" />

      {/* <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" /> */}

      <div className="mt-4 h-4 w-20 rounded bg-gray-200" />

      <div className="mt-4 h-7 w-full rounded-lg bg-gray-200" />
    </div>
  );
};

export default CardSkeleton;