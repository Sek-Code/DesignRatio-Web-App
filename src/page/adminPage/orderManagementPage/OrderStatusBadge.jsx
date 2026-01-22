import React from 'react';

const OrderStatusBadge = ({ status }) => {
  const baseClasses = 'inline-flex px-3 py-1 text-sm font-semibold rounded-full capitalize justify-center items-center min-w-[110px]';
  let statusClasses;

  switch (status?.toLowerCase()) {
    case 'shipped':
      statusClasses = 'bg-[#9e9957] text-white';
      break;
    case 'preparing':
      statusClasses = 'bg-[#f3ece3] text-brown';
      break;
    case 'delivered':
      statusClasses = 'bg-green-200 text-green-800';
      break;
    case 'cancelled':
      statusClasses = 'bg-red-200 text-red-800';
      break;
    default:
      statusClasses = 'bg-gray-200 text-gray-800';
  }

  return (
    <span className={`${baseClasses} ${statusClasses}`}>
      {status}
    </span>
  );
};

export default OrderStatusBadge;
