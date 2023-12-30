import React, { useEffect, useRef } from "react";
import { ThemeProvider } from "@mui/material/styles";
import MUIDataTable from "mui-datatables";
import { searchFiltercolor } from "../constants";
import { createTheme } from "@mui/material";

const getMuiTableTheme = () =>
  createTheme({
    components: {
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: searchFiltercolor,
            padding: "2px",
          },
        },
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            padding: "2px",
          },
        },
      },
    },
  });

const CustomMuiDataTable = ({ title, columns, data, options }) => {
  const tableRef = useRef(null);
  const scrollDivRef = useRef(null);

  const cusOption = {
    ...options,
    onTableInit: (tableState) => {
      renderTopScroll();
    },
    onTableChange: (action, tableState) => {
      renderTopScroll();

      if (options.onTableChange) {
        options.onTableChange(action, tableState);
      }
    },
    setTableProps: () => {
      return {
        ref: tableRef,
      };
    },
  };

  const renderTopScroll = () => {
    if (tableRef.current) {
      const tableWidth = tableRef.current.clientWidth;

      if (scrollDivRef.current) {
        scrollDivRef.current.firstChild.style.width = `${tableWidth}px`;
      } else {
        const containerDiv = document.createElement("div");
        containerDiv.style.overflow = "auto";

        const heightDiv = document.createElement("div");
        heightDiv.style.height = "1px";

        containerDiv.appendChild(heightDiv);

        tableRef.current.parentNode.parentNode.insertBefore(containerDiv, tableRef.current.parentNode);

        heightDiv.style.width = `${tableWidth}px`;

        containerDiv.addEventListener("scroll", handleScroll);
        tableRef.current.parentNode.addEventListener("scroll", handleScroll);

        scrollDivRef.current = containerDiv;
      }
    }
  };

  const handleScroll = (e) => {
    if (tableRef.current && scrollDivRef.current) {
      if (e.target === tableRef.current.parentNode) {
        scrollDivRef.current.scrollLeft = tableRef.current.parentNode.scrollLeft;
      } else if (e.target === scrollDivRef.current) {
        tableRef.current.parentNode.scrollLeft = scrollDivRef.current.scrollLeft;
      }
    }
  };

  useEffect(() => {
    return () => {
      scrollDivRef.current?.removeEventListener("scroll", handleScroll);
      tableRef.current?.parentNode?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={getMuiTableTheme()}>
      <MUIDataTable title={title} columns={columns} data={data} options={cusOption} />
    </ThemeProvider>
  );
};

export default CustomMuiDataTable;
