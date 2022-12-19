import * as React from 'react';
// Material-UI
import { Grid, Stack, Box, Autocomplete, TextField } from '@mui/material';
import { usePtStorage } from 'contexts/StorageContext';

// Hooks
import useConfig from 'hooks/useConfig';

// Project Imports
import { gridSpacing, locales } from 'store/constant';

// Types & Data
import { StorageProps } from 'types/storagecontext';
import all_markets from 'data/markets.json';

// ==============================|| LOCALIZATION ||============================== //

const Localization = () => {
  const { onChangeLocale } = useConfig();

  const {
    ptCats,
    ptMarket,
    ptLocale,
    ptMarketChange,
    ptLocaleChange,
    ptCatsChange,
  } = usePtStorage() as StorageProps;

  React.useEffect(() => {
    if (ptMarket) ptCatsChange(ptMarket.categories.include);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ptMarket]);

  React.useEffect(() => {
    console.log(ptCats);
  }, [ptCats]);

  return (
    <>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Stack direction="row" spacing={2}>
            {/* MARKET DROPDOWN */}
            <Autocomplete
              id="marks"
              className="lang-dropdown"
              size="medium"
              value={all_markets.find(
                (option: any) => option.id === ptMarket.id
              )}
              onChange={(event, value) => {
                ptMarketChange(value.id!);
              }}
              options={all_markets}
              fullWidth
              autoHighlight
              disableClearable
              getOptionLabel={option => option.country}
              isOptionEqualToValue={option => option.id === ptMarket.id}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box sx={{ py: 1 }}> {option.country}</Box>
                </Box>
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  label=""
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
            {/* LANGUAGE DROPDOWN */}
            <Autocomplete
              id="langs"
              className="lang-dropdown"
              size="medium"
              value={ptMarket.locales.find(
                (option: string) => option === ptLocale
              )}
              onChange={(event, value) => {
                ptLocaleChange(value);
                onChangeLocale(value);
              }}
              options={ptMarket.locales}
              fullWidth
              autoHighlight
              disableClearable
              getOptionLabel={(option: string) => locales[option]}
              isOptionEqualToValue={option => option === ptLocale}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  <Box sx={{ py: 1 }}> {locales[option]}</Box>
                </Box>
              )}
              renderInput={params => (
                <TextField
                  {...params}
                  label=""
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Localization;
