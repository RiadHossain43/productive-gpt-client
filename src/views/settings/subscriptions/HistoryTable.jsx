import { Table } from "reactstrap";
import React from "react";
import { useSubscriptions } from "./store";
import moment from "moment";

const HistoryTable = () => {
  const { payments } = useSubscriptions();
  return (
    <React.Fragment>
      <h4 className="mt-2">Invoice history</h4>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => {
            let createDate = new Date(0);
            createDate = createDate.setUTCSeconds(payment.created);
            return (
              <tr key={payment.id}>
                <td>{moment(createDate).format("DD/MM/YYYY")}</td>
                <td>
                  {parseFloat(payment.amount_paid / 100).toFixed(2)}{" "}
                  {payment.currency}
                </td>
                <td className="text-success">{payment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
};

export default HistoryTable;
