interface NumResultsProps {
  moviesNum: number;
}

function NumResults({ moviesNum }: NumResultsProps) {
  return (
    <p className='num-results'>
      Found <strong>{moviesNum}</strong> results
    </p>
  );
}

export default NumResults;
