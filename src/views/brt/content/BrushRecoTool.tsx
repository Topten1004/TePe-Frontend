import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BackendUrl } from 'config';
import { useLocation } from 'react-use';

// Material-UI
import {
  Box,
  Button,
  IconButton,
  Container,
  Grid,
  Typography,
  Step,
  Stepper,
  StepLabel,
  Stack,
} from '@mui/material';

// Project Imports
import Logo from 'components/Logo';
import Wireframe from './Wireframe';
import AssignProduct from './assignment/AssignProduct';
import Product from './products/Product';
import Instruction from './instructions/Instruction';
import MissingTeeth from './missing/MissingTeeth';
import PatInformation from './information/PatInformation';
import Summery from './summery/Summery';
import Recommendations from './summery/Recommendations';
import Overview from './overview/ProductOverview';
import dictionaryList from 'utils/locales';

// Data
import wireframe_constant from 'data/wireframe.json';

// Types
import { CategoryData, ItemData } from 'types/interdental';
import { IRecommendBrush, IWireFrameRefProps } from 'types/wireframe';

// Hook
import { usePtStorage } from 'contexts/StorageContext';
import { StorageProps } from 'types/storagecontext';

// Third Party
import { FormattedMessage } from 'react-intl';
import domtoimage from 'dom-to-image';

// Assets
import GridBg from 'assets/images/bg/grid-bg.png';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
// import CheckIcon from '@mui/icons-material/Check';

// ==============================|| BRUSH RECOMMENDATION TOOL ||============================== //

// step options
const stepLebels = [
  { label: <FormattedMessage id="select_products" /> },
  { label: <FormattedMessage id="assign_products" /> },
  {
    label: <FormattedMessage id="instructions" />,
  },
  {
    label: <FormattedMessage id="missing_teeth" />,
  },
  { label: <FormattedMessage id="patient_info" /> },
];

// ==============================|| BRUSH RECOMMENDATION TOOL ||============================== //

const BrushRecoTool = () => {
  const { ptCats, ptLocale, ptMarket } = usePtStorage() as StorageProps;
  const location: any = useLocation();

  const [activeStep, setActiveStep] = React.useState(0);
  const [visibleBtn, setVisibleBtn] = React.useState(true);
  const [overview, setOverview] = React.useState<boolean>(false);

  const [isSelectedProduct, setIsSelectedProduct] =
    React.useState<boolean>(true);

  const [activeBrush, setActiveBrush] = React.useState<object>({});
  const wireFrameRef = React.useRef<IWireFrameRefProps>(null);
  const [recommended_list, setRecommendedList] = React.useState<
    IRecommendBrush[]
  >([]);

  const [missing_list, setMissingList] = React.useState<number[]>([]);

  const [selectedOpt, setSelectedOpt] = React.useState<string>('no');
  const [bridge_list, setBridgeList] = React.useState<number[]>([]);

  const [email, setEmail] = React.useState<string>('');
  const [phone_number, setPhoneNumber] = React.useState<string>('');
  const [comment, setComment] = React.useState<string>('');

  const [loading, setLoading] = React.useState<boolean>(false);

  // Setting the body background color
  document.body.style.backgroundColor = '#ffffff';

  /** ------------------------------------------------- */
  const handleNext = () => {
    if (activeStep === 0) {
      const tempList: CategoryData[] = [];

      for (const product of assign_product) {
        const temp: ItemData[] = product.data.filter(item => item.isChecked);

        if (temp.length) {
          tempList.push({
            ...product,
            data: [
              ...temp.map(item => {
                item.isChecked = false;
                return item;
              }),
            ],
            isOpen: false,
          });
        }
      }

      setList([...tempList]);
      setVisibleBtn(false);
    }
    if (activeStep === 4) {
      if (!email || !phone_number) return;
    }
    setActiveStep(activeStep + 1);
  };

  const handleReset = () => {
    setActiveStep(0);

    if (wireFrameRef.current) {
      wireFrameRef.current.call_resetSVG();
      wireFrameRef.current.call_applyPointerEvents('none', 'none');

      setActiveBrush({});
      setVisibleBtn(true);
    }

    setAssignProduct([
      ...ptCats.map(item => {
        item.isOpen = false;
        return item;
      }),
    ]);
    setEmail('');
    setPhoneNumber('');
    setComment('');
    setSelectedOpt('no');
  };

  /** ------------------------------------------------- */
  // const showOverview = () => {
  //   setOverview(true);
  //   setVisibleBtn(false);
  // };

  const closeOverview = () => {
    setOverview(false);
    setVisibleBtn(true);
  };

  const deleteBrush = (index: number) => {
    if (wireFrameRef.current) {
      wireFrameRef.current.call_delete_recommend_brush(
        index,
        recommended_list || []
      );
    }
  };

  /** ------------------------------------------------- */
  const [list, setList] = useState<CategoryData[]>([]);
  const [assign_product, setAssignProduct] = useState<CategoryData[]>([]);

  /** ------------------------------------------------- */
  const eventCheckboxHandler = async (catId: string, actionId: string) => {
    if (catId === '1') {
      setVisibleBtn(true);
      if (actionId === '1') {
        console.log('This is category 1');
      }
    }
    if (catId === '2') {
      setVisibleBtn(true);
      if (actionId === '1') {
        console.log('This is category 2');
      }
    }
    if (catId === '3') {
      setVisibleBtn(true);
      if (actionId === '1') {
        console.log('This is category 3');
      }
    }
  };

  const onEmit = (key: string, data: ItemData) => {
    console.log('Event Emitted To Parent =>', key, data);

    const current_cat: CategoryData | undefined = ptCats.find(
      (cat: CategoryData) => cat?.id === key
    );

    if (current_cat) {
      const brush_list: ItemData[] = current_cat.data || [];

      if (brush_list.length) {
        const current_brush: any = brush_list.find(
          (brush: any) => brush.id === data?.id
        );

        setActiveBrush({
          ...current_brush,
          cat_id: key,
          cat_img: current_cat.catImg,
          title: current_cat.title?.[ptLocale],
          name: current_brush.name?.[ptLocale],
        });
      }
      eventCheckboxHandler(key, data.id!);
    }
  };

  /** ------------------------------------------------- */
  const onCollapse = (key: string, isOpen: boolean) => {
    setList([
      ...list.map(item => {
        if (item.id === key) {
          item.isOpen = !isOpen;
        } else {
          item.isOpen = false;
        }
        return item;
      }),
    ]);

    if (!isOpen) setActiveBrush({});
    else setActiveBrush({});

    setVisibleBtn(false);
  };

  const handleBridgeList = (el_bridge: number) => {
    if (el_bridge === 100) {
      setBridgeList([]);
      return;
    }

    const temp = [...bridge_list];

    if (!temp.includes(el_bridge)) {
      temp.push(el_bridge);
    } else {
      const find_index = temp.indexOf(el_bridge);
      temp.splice(find_index, 1);
    }

    setBridgeList([...temp]);
  };

  const handleMissingList = (el_missing: number) => {
    if (el_missing === 100) {
      setMissingList([]);
      return;
    }

    const temp = [...missing_list];

    if (!temp.includes(el_missing)) {
      temp.push(el_missing);
    } else {
      const find_index = temp.indexOf(el_missing);
      temp.splice(find_index, 1);
    }

    setMissingList([...temp]);
  };

  const recommendBrushDescription = (brush_data: IRecommendBrush) => {
    const { description, name, size } = brush_data;

    return `${
      !name
        ? wireframe_constant.recommend_desc.size
        : wireframe_constant.recommend_desc.brush
    } ${size}${!name ? '' : 'mm'} ${name} ${
      description === wireframe_constant.recommend_desc.upper_row ||
      description === wireframe_constant.recommend_desc.lower_row ||
      description === wireframe_constant.recommend_desc.entire_mouth
        ? wireframe_constant.recommend_desc.entire_prefix
        : wireframe_constant.recommend_desc.gap_prefix
    }`;
  };

  const handleSavePatientInfo = () => {
    setLoading(true);

    const recommendList: string[] = [];

    let temp: object;

    recommended_list.forEach(recommend_brush => {
      temp = {
        title: `${recommend_brush?.title}`,
        description: `${recommendBrushDescription(recommend_brush)}`,
        size: `${recommend_brush?.size}`,
        area: `${recommend_brush.description
          .replace('_', ' ')
          .toUpperCase()
          .replaceAll('|', ' | ')}`,
        cat_img_name: `${recommend_brush?.cat_img}`,
      };

      recommendList.push(JSON.stringify(temp));
    });

    const el: HTMLElement | null = document.getElementById('teeth_svg_img');

    if (el) {
      domtoimage.toBlob(el).then(blob => {
        if (blob) {
          blobToBase64(blob)
            .then((result: any) => {
              const fn: FormData = new FormData();

              console.log(ptMarket);

              fn.append('email', `${email}`);
              fn.append('phone_number', `${phone_number}`);
              fn.append('comment', `${comment}`);
              fn.append('recommendations', `[${recommendList.join(',')}]`);
              fn.append('market_id', ptMarket.id);
              fn.append('lang', ptLocale);
              fn.append('sender', `${ptMarket.sender_phone}`);
              fn.append('receiver', `${phone_number}`);
              fn.append(
                'body',
                `${dictionaryList[`${ptLocale}`].message}${
                  location.origin
                }/assessment?recommendation_id=`
              );

              for (const bridge of bridge_list) {
                fn.append('bridge[]', bridge.toFixed());
              }

              for (const missing of missing_list) {
                fn.append('missing[]', missing.toFixed());
              }

              fn.append('teeth_image', result);

              console.log(result);
              axios
                .post(`${BackendUrl}Patient`, fn)
                .then(async (res: any) => {
                  console.log(res);

                  setLoading(false);
                  handleReset();
                  setActiveStep(0);

                  console.log(res.data.value.recommendations);
                  // await SendProductLink(
                  //   phone_number,
                  //   `${dictionaryList[`${ptLocale}`].message}`,
                  //   `${location.origin}/assessment?recommendation_id=${res.data.value.recommendations[0].id}`
                  // );
                })
                .catch((err: any) => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  };

  const onSelItem = (key: string, data: ItemData) => {
    setAssignProduct([
      ...assign_product.map(product => {
        if (product.id === key) {
          product.data = [
            ...product.data.map(item => {
              if (item.id === data.id) item.isChecked = !item.isChecked;
              return item;
            }),
          ];
        }
        return product;
      }),
    ]);
  };

  const onCollapseItems = (key: string, isOpen: boolean) => {
    setAssignProduct([
      ...assign_product.map(item => {
        if (item.id === key) {
          item.isOpen = !isOpen;
        } else {
          item.isOpen = false;
        }
        return item;
      }),
    ]);
  };

  /** ------------------------------------------------- */
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <div className="product-scroll">
              <div className="content">
                {assign_product.map(item => (
                  <AssignProduct
                    key={item.id}
                    title={item.title?.[`${ptLocale}`]}
                    is_open={item.isOpen!}
                    cat_img={item.catImg}
                    dataSource={item.data!}
                    onEmit={data => onSelItem(item.id!, data)}
                    onCollapse={b => onCollapseItems(item.id!, b)}
                  />
                ))}
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <div className="product-scroll">
              <div className="content">
                {list.map(item => (
                  <Product
                    key={item.id}
                    title={item.title?.[`${ptLocale}`]}
                    is_open={item.isOpen!}
                    cat_img={item.catImg}
                    dataSource={item.data!}
                    onEmit={data => onEmit(item.id!, data)}
                    onCollapse={b => onCollapse(item.id!, b)}
                  />
                ))}
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            {activeStep === 2 && (
              <Instruction
                selectedOpt={selectedOpt}
                setSelectedOpt={setSelectedOpt}
                comment={comment}
                setComment={setComment}
              />
            )}
          </>
        );
      case 3:
        return (
          <>
            <MissingTeeth />
          </>
        );
      case 4:
        return (
          <>
            <PatInformation
              email={email}
              setEmail={setEmail}
              phone_number={phone_number}
              setPhoneNumber={setPhoneNumber}
            />
          </>
        );
      default:
        throw new Error('Unknown step');
    }
  };

  const blobToBase64 = (blob: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  useEffect(() => {
    // setList(ptCats.map((item: any) => item));
    setAssignProduct([...ptCats]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // console.log(assign_product);
    let isChecked = false;
    for (const product of assign_product) {
      for (const item of product.data) {
        if (item.isChecked) isChecked = true;
      }
    }
    console.log(isChecked);
    setIsSelectedProduct(isChecked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assign_product]);

  useEffect(() => {
    console.log(ptCats);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ptCats]);

  return (
    <Container>
      <Grid container justifyContent="space-between">
        {/* ********************************************************************* */}
        <Grid container className="brt-grid-title">
          <Grid item xs={3}>
            {overview === false ? <Logo /> : <></>}
          </Grid>

          <Grid item xs={4}>
            {/* LEAVE EMPTY */}
          </Grid>

          {/* <Grid item xs={4}>
            {visibleBtn === true ? (
              <Button
                variant="outlined"
                startIcon={<CheckIcon />}
                endIcon={
                  <Typography className="text">
                    <FormattedMessage id="view" />
                  </Typography>
                }
                className="reco-button"
              >
                <Typography variant="h4" onClick={showOverview}>
                  {`Product Recommendation: ${recommended_list.length}`}
                </Typography>
              </Button>
            ) : (
              <></>
            )}
          </Grid> */}
        </Grid>
        {/* ********************************************************************* */}
        {overview === false ? (
          <>
            {/* LEFT GRID */}
            <Grid item xs={12} md={3}>
              <Grid item className="brt-left-grid">
                {/* STEPPER */}
                {activeStep === stepLebels.length ? (
                  <Summery
                    email={email}
                    phone_number={phone_number}
                    comment={comment}
                    bridge_list={bridge_list}
                    missing_list={missing_list}
                  />
                ) : (
                  <Stepper
                    activeStep={activeStep}
                    connector={null}
                    orientation="vertical"
                    className="stepper"
                  >
                    {stepLebels.map((step, index) => (
                      <Step key={index} sx={{ mx: 2.5, mb: 3 }}>
                        <StepLabel
                          className={`${
                            activeStep === index
                              ? 'arrow-pointer'
                              : 'arrow-hidden'
                          }`}
                        >
                          <Typography
                            className={`${
                              activeStep === index ? 'active' : 'none-active'
                            }`}
                          >
                            {step.label}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                )}
                {/* BUTTONS */}
                <>
                  {activeStep === stepLebels.length ? (
                    <>
                      <Stack direction="row">
                        <IconButton
                          disableRipple
                          color="primary"
                          className="align-bottom"
                          onClick={handleReset}
                          style={{ backgroundColor: 'transparent' }}
                        >
                          <RestartAltIcon />
                          <Typography className="body1">
                            <FormattedMessage id="start_over" />
                          </Typography>
                        </IconButton>
                      </Stack>
                    </>
                  ) : (
                    <>
                      <Stack direction="row" justifyContent="flex-start">
                        {activeStep !== 0 ? (
                          <IconButton
                            disableRipple
                            color="primary"
                            className="align-bottom"
                            /* onClick={handleBack} ORG */
                            onClick={handleReset}
                            style={{ backgroundColor: 'transparent' }}
                          >
                            <RestartAltIcon />
                            <Typography className="body1">
                              <FormattedMessage id="start_over" />
                            </Typography>
                          </IconButton>
                        ) : (
                          <>
                            {recommended_list.length ? (
                              <IconButton
                                color="primary"
                                className="align-bottom"
                                onClick={handleReset}
                                style={{ backgroundColor: 'transparent' }}
                              >
                                <RestartAltIcon />
                                <Typography className="body1">
                                  <FormattedMessage id="start_over" />
                                </Typography>
                              </IconButton>
                            ) : (
                              <></>
                            )}
                          </>
                        )}
                      </Stack>
                    </>
                  )}
                </>
              </Grid>
            </Grid>
            {/* ********************************************************************* */}
            {/* MIDDLE GRID */}
            <Grid item xs={12} md={4} className="brt-middle-grid">
              <Grid item>
                {stepLebels.map((step, index) => (
                  <Typography variant="h2" key={index}>
                    {activeStep === index ? step.label : ''}
                  </Typography>
                ))}
                <>
                  {activeStep === stepLebels.length ? (
                    <>
                      <Typography variant="h2">
                        <FormattedMessage id="recommendations" />
                      </Typography>
                      <Box className="middle-box">
                        <div className="product-scroll">
                          <div className="content">
                            {recommended_list.map((item, index) => (
                              <Recommendations
                                key={index}
                                recommend_brush={item}
                              />
                            ))}
                          </div>
                        </div>
                      </Box>
                    </>
                  ) : (
                    <>{getStepContent(activeStep)}</>
                  )}
                </>
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} md={8}>
            <Overview
              recommend_list={recommended_list}
              deleteBrush={deleteBrush}
              btnClick={closeOverview}
            />
          </Grid>
        )}
        {/* ********************************************************************* */}
        {/* RIGHT GRID */}
        <Grid item xs={12} md={4} className="brt-right-grid">
          <Grid
            item
            className={`${visibleBtn === false ? 'faded-grid' : ''}`}
            sx={{ background: 'white' }}
            id="teeth_svg_img"
          >
            {!loading ? (
              <Typography variant="h2">
                <FormattedMessage id="patient_mouth" />
              </Typography>
            ) : (
              <></>
            )}
            <Box
              sx={{
                backgroundImage: `url(${GridBg})`,
              }}
              className="bg-img"
            >
              <Wireframe
                visible_btn={visibleBtn}
                active_brush={activeBrush}
                selected_opt={selectedOpt}
                bridge_list={bridge_list}
                missing_list={missing_list}
                active_step={activeStep}
                overview_opened={overview}
                recommended_list={recommended_list}
                setRecommendedList={setRecommendedList}
                setBridgeList={handleBridgeList}
                setMissingList={handleMissingList}
                ref={wireFrameRef}
              />

              {activeStep === stepLebels.length && !loading ? (
                <>
                  <Button
                    variant="contained"
                    className="align-bottom contained-button"
                    onClick={handleSavePatientInfo}
                    disabled={loading}
                    sx={{ opacity: loading ? '0.5' : '1' }}
                  >
                    <FormattedMessage id="send" />
                  </Button>
                </>
              ) : (
                <>
                  {visibleBtn === true && !loading ? (
                    <Button
                      variant="contained"
                      className={
                        selectedOpt === 'no' && activeStep === 2
                          ? 'align-bottom contained-button-white'
                          : 'align-bottom contained-button'
                      }
                      onClick={handleNext}
                      sx={{
                        opacity:
                          (activeStep === 4 && (!email || !phone_number)) ||
                          !isSelectedProduct
                            ? '0'
                            : '1',
                      }}
                    >
                      {activeStep === stepLebels.length - 1 ? (
                        <FormattedMessage id="summery" />
                      ) : (
                        <FormattedMessage
                          id={
                            // eslint-disable-next-line no-nested-ternary
                            selectedOpt === 'no' && activeStep === 2
                              ? 'skip'
                              : activeStep === 0
                              ? 'iamdone'
                              : 'next'
                          }
                        />
                      )}
                    </Button>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BrushRecoTool;
