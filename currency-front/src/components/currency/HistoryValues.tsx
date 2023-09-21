import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Title from './Title';
import { currencyApi } from '../../config/axios-services';
import { AxiosRequestConfig } from 'axios';

const columns = [
  { id: 'currencyTime', label: 'Date' },
  { id: 'baseCurrency', label: 'From' },
  { id: 'targetCurrency', label: 'Target' },
  { id: 'exchangeRate', label: 'Value', align: 'right' },
];

interface CurrencyData {
  id: number;
  currencyTime: string;
  baseCurrency: string;
  targetCurrency: string;
  exchangeRate: number;
}

export default function History() {
  const [currentPage, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState<CurrencyData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params: AxiosRequestConfig = {
          params: {
            baseCurrency: 'USD',
            targetCurrency: 'BRL',
            sortBy: 'currencyTime:desc',
            page: currentPage + 1,
            limit: rowsPerPage,
          },
        };

        const response = await currencyApi.get('/currency-rates', params);
        const { page, totalResults, results } = response.data;

        setPage(page - 1);
        setCount(totalResults);
        setTableData(results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage, rowsPerPage]);

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BRL', 
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US');
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Title>History</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row: any) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id}>
                  {column.id === 'exchangeRate'
                    ? formatMoney(row[column.id])
                    : column.id === 'currencyTime'
                    ? formatDate(row[column.id])
                    : row[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        count={count}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
