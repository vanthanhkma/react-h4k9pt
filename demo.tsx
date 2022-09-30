import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import {
  GridColumns,
  GridRowsProp,
  DataGridPro,
  GridPreProcessEditCellProps,
  GridEditInputCell,
  GridRenderEditCellParams,
} from '@mui/x-data-grid-pro';

const StyledBox = styled(Box)(({ theme }) => ({
  height: 400,
  width: '100%',
  '& .MuiDataGrid-cell--editable': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#376331' : 'rgb(217 243 190)',
    '& .MuiInputBase-root': {
      height: '100%',
    },
  },
  '& .Mui-error': {
    backgroundColor: `rgb(126,10,15, ${
      theme.palette.mode === 'dark' ? 0 : 0.1
    })`,
    color: theme.palette.mode === 'dark' ? '#ff4343' : '#750f0f',
  },
}));

let promiseTimeout: any;
function validateName(username: string): Promise<boolean> {
  const existingUsers = rows.map((row) => row.name.toLowerCase());

  return new Promise<any>((resolve) => {
    const exists = existingUsers.includes(username.toLowerCase());
    resolve(exists ? `${username} is already taken.` : null);
    // simulate network latency
  });
}

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

function NameEditInputCell(props: GridRenderEditCellParams) {
  const { error } = props;

  return (
    <StyledTooltip open={!!error} title={error}>
      <GridEditInputCell {...props} />
    </StyledTooltip>
  );
}

function renderEditName(params: GridRenderEditCellParams) {
  return <NameEditInputCell {...params} />;
}

export default function ValidateServerNameGrid() {
  const preProcessEditCellProps = async (
    params: GridPreProcessEditCellProps
  ) => {
    const errorMessage = await validateName(params.props.value!.toString());
    return { ...params.props, error: errorMessage };
  };

  const columns: GridColumns = [
    {
      field: 'name',
      headerName: 'MUI Contributor',
      width: 180,
      editable: true,
      preProcessEditCellProps,
      renderEditCell: renderEditName,
    },
  ];

  return (
    <StyledBox>
      <DataGridPro
        rows={rows}
        columns={columns}
        isCellEditable={(params) => params.row.id === 5}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </StyledBox>
  );
}

const rows: GridRowsProp = [
  {
    id: 1,
    name: 'Damien',
  },
  {
    id: 2,
    name: 'Olivier',
  },
  {
    id: 3,
    name: 'Danail',
  },
  {
    id: 4,
    name: 'Matheus',
  },
  {
    id: 5,
    name: 'You?',
  },
];
