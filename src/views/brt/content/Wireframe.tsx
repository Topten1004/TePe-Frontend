import * as React from 'react';

// Material-UI
import { Grid, Box, Typography, Button } from '@mui/material';

// Data
import wireframe_constant from 'data/wireframe.json';

// Types
import { IRecommendBrush, WireframeProps } from 'types/wireframe';

// Third Party
import { FormattedMessage } from 'react-intl';

// Assets
import { ReactComponent as TeethSvg } from 'assets/images/bg/teeth-complete-set.svg';
import { teeth, highlight } from 'assets/js/svg_el';

import CheckIcon from 'assets/images/icons/check.png';

// =============================|| TEETH WIREFRAME ||============================= //

const Wireframe = React.forwardRef(
  (
    {
      visible_btn,
      selected_opt,
      bridge_list,
      missing_list,
      active_brush,
      active_step,
      overview_opened,
      recommended_list,
      setRecommendedList,
      setBridgeList,
      setMissingList,
    }: WireframeProps,
    ref
  ) => {
    const [selected_teeth, setSelectedTeeth] = React.useState<string>('');
    const [is_locked, setLocked] = React.useState<Boolean>(false);
    const [isLoaded, setLoaded] = React.useState<Boolean>(false);

    const [current_brush, setCurrentBrush] = React.useState<IRecommendBrush>({
      cat_id: '',
      id: '',
      name: '',
      size: '',
      hex: '',
      description: '',
      placement: '',
      image: '',
      isChecked: false,
    });

    const [brush_logs_list, setBrushLogsList] = React.useState<string[]>([]);
    const [display_number, setDisplayedNumber] = React.useState<string>('');

    const loading = () => {
      if (!isLoaded) {
        setLoaded(false);

        setTimeout(() => {
          setLoaded(true);
        }, 500);
      }
    };

    const changeDotColor = (el: HTMLElement | null) => {
      if (el) {
        const ec: Element | null = el.firstElementChild;
        if (ec && current_brush?.hex) {
          ec.setAttribute('fill', current_brush?.hex || '');
        }
      }
    };

    const convert_teeth_number = (to_be_converted: string) => {
      const temp: string = to_be_converted
        ? `S_${to_be_converted
            .replace('|', '_')
            .replace('[', '')
            .replace(']', '')}`
        : '';
      return temp;
    };

    const getDotColor = (el: HTMLElement | null) => {
      if (el) {
        const ec: Element | null = el.firstElementChild;
        if (ec) {
          return ec.getAttribute('fill');
        }
      }
      return null;
    };

    const deleteRecommendBrush = (index: number, list: IRecommendBrush[]) => {
      const deleted_brush: IRecommendBrush = list[index];

      let i: number = 0;

      while (i <= 30) {
        const el: HTMLElement | null = document.getElementById(`Dot_${i + 1}`);
        if (el && getDotColor(el) === deleted_brush?.hex) {
          el.style.visibility = 'hidden';
        }
        i += 1;
      }

      const temp: IRecommendBrush[] = [...list];

      let find_index: number = -1;

      const tmp: string[] = [...brush_logs_list];

      find_index = tmp.findIndex(brush => brush === temp[index]?.hex);

      if (find_index >= 0) {
        tmp.splice(find_index, 1);
        if (!tmp.length) {
          setLoaded(false);
        }
        setBrushLogsList(tmp);
      }

      temp.splice(index, 1);

      setRecommendedList([...temp]);

      if (is_locked) {
        if (
          deleted_brush?.description.search(
            wireframe_constant.recommend_desc.upper_row
          ) >= 0
        ) {
          applyPointerEvents('none', 'all');
          setLocked(false);
        } else if (
          deleted_brush?.description.search(
            wireframe_constant.recommend_desc.lower_row
          ) >= 0
        ) {
          applyPointerEvents('all', 'none');
          setLocked(false);
        }
      } else if (
        deleted_brush?.description.search(
          wireframe_constant.recommend_desc.upper_row
        ) >= 0 ||
        deleted_brush?.description.search(
          wireframe_constant.recommend_desc.lower_row
        ) >= 0
      ) {
        setSelectedTeeth('');
        applyPointerEvents('all', 'all');
      } else if (
        deleted_brush?.description ===
        wireframe_constant.recommend_desc.entire_mouth
      ) {
        if (!selected_teeth) {
          applyPointerEvents('all', 'all');
        } else if (
          selected_teeth === wireframe_constant.selected_teeth.upper_teeth
        ) {
          applyPointerEvents('all', 'none');
        } else if (
          selected_teeth === wireframe_constant.selected_teeth.lower_teeth
        ) {
          applyPointerEvents('none', 'all');
        }
      }
    };

    const updateRecommendList = (
      brush: IRecommendBrush | undefined,
      action: string,
      description: string
    ) => {
      if (!brush) return;

      if (action === 'clean') {
        setRecommendedList([]);
        return;
      }

      let is_exist: number = -1;

      is_exist = recommended_list.findIndex(
        recommend_brush =>
          recommend_brush.id === current_brush?.id &&
          recommend_brush.cat_id === current_brush?.cat_id
      );

      const temp: IRecommendBrush[] = [...recommended_list];

      if (action === 'remove') {
        if (is_exist === -1) return;

        temp.splice(is_exist, 1);

        setRecommendedList(temp);
        return;
      }

      if (action === 'insert') {
        if (description === wireframe_constant.recommend_desc.entire_mouth) {
          if (is_exist >= 0) {
            temp[is_exist] = {
              ...temp[is_exist],
              description: wireframe_constant.recommend_desc.entire_mouth,
            };
          } else {
            temp.push({
              ...brush,
              description: `${description}`,
            });
          }
          setRecommendedList(temp);
        } else if (
          description === wireframe_constant.recommend_desc.upper_row ||
          description === wireframe_constant.recommend_desc.lower_row
        ) {
          if (is_exist >= 0) {
            if (
              temp[is_exist].description ===
              wireframe_constant.recommend_desc.entire_mouth
            )
              return;

            if (
              temp[is_exist].description.search(
                wireframe_constant.recommend_desc.upper_row
              ) >= 0 ||
              temp[is_exist].description.search(
                wireframe_constant.recommend_desc.lower_row
              ) >= 0
            ) {
              temp[is_exist] = {
                ...temp[is_exist],
                description: wireframe_constant.recommend_desc.entire_mouth,
              };
            } else {
              const fragments: string[] = temp[is_exist].description.split(' ');
              const temp_fragments: string[] = [...fragments];

              if (description === wireframe_constant.recommend_desc.upper_row) {
                fragments.forEach(fragment => {
                  if (
                    highlight.upperTeeth.includes(
                      convert_teeth_number(fragment)
                    )
                  ) {
                    const find_index = temp_fragments.findIndex(
                      temp_fragment => temp_fragment === fragment
                    );

                    if (find_index >= 0) temp_fragments.splice(find_index, 1);
                  }
                });
              } else if (
                description === wireframe_constant.recommend_desc.lower_row
              ) {
                fragments.forEach(fragment => {
                  if (
                    highlight.lowerTeeth.includes(
                      convert_teeth_number(fragment)
                    )
                  ) {
                    const find_index = temp_fragments.findIndex(
                      temp_fragment => temp_fragment === fragment
                    );

                    if (find_index >= 0) temp_fragments.splice(find_index, 1);
                  }
                });
              }

              if (!temp_fragments.length) {
                temp[is_exist] = {
                  ...temp[is_exist],
                  description: `${description}`,
                };
              } else {
                temp[is_exist] = {
                  ...temp[is_exist],
                  description: `${description} - ${temp_fragments.join(' ')}`,
                };
              }
            }
          } else {
            temp.push({
              ...brush,
              description: `${description}`,
            });
          }
          setRecommendedList(temp);
        } else {
          if (is_exist >= 0) {
            if (
              temp[is_exist].description ===
              wireframe_constant.recommend_desc.entire_mouth
            )
              return;

            if (
              temp[is_exist].description ===
                wireframe_constant.recommend_desc.upper_row ||
              temp[is_exist].description ===
                wireframe_constant.recommend_desc.lower_row
            ) {
              temp[is_exist] = {
                ...temp[is_exist],
                description: `${temp[is_exist].description} - ${description}`,
              };
            } else {
              temp[is_exist] = {
                ...temp[is_exist],
                description: `${temp[is_exist].description} ${description}`,
              };
            }
          } else {
            temp.push({
              ...brush,
              description: `${description}`,
            });
          }
          setRecommendedList(temp);
        }
      }
    };

    const addEntireBrush = () => {
      const temp: string[] = [...brush_logs_list];

      if (!temp.includes(current_brush?.hex ? current_brush.hex : '')) {
        temp.push(current_brush?.hex ? current_brush.hex : '');
        setBrushLogsList(temp);
      }
    };

    const applyPointerEvents = (
      lower_pointer_event: string,
      upper_pointer_event: string
    ) => {
      let id: string;

      for (id of highlight.lowerTeeth) {
        const el: HTMLElement | null = document.getElementById(id);
        if (el) el.style.pointerEvents = lower_pointer_event;
      }
      for (id of highlight.upperTeeth) {
        const el: HTMLElement | null = document.getElementById(id);
        if (el) el.style.pointerEvents = upper_pointer_event;
      }
    };

    const applyForEntireMouth = () => {
      if (!current_brush?.hex) return;

      updateRecommendList(
        current_brush,
        'insert',
        wireframe_constant.recommend_desc.entire_mouth
      );

      addEntireBrush();
      applyPointerEvents('none', 'none');

      let index: number = 0;

      let flag: Boolean = true;

      while (index < 30) {
        const el: HTMLElement | null = document.getElementById(
          `Dot_${index + 1}`
        );
        if (el) {
          const ec: Element | null = el.firstElementChild;
          if (ec) {
            if (ec.getAttribute('fill') === current_brush?.hex) {
              el.style.visibility = 'hidden';
              if (is_locked && flag) {
                flag = false;
                setLocked(false);
                if (teeth.upperTeeth.includes(index + 1)) {
                  setSelectedTeeth(
                    wireframe_constant.selected_teeth.lower_teeth
                  );
                }
                if (teeth.lowerTeeth.includes(index + 1)) {
                  setSelectedTeeth(
                    wireframe_constant.selected_teeth.upper_teeth
                  );
                }
                handlePointerEvents();
              }
            }
          }
        }
        index += 1;
      }

      if (flag) {
        setSelectedTeeth('');
      }

      loading();
    };

    const setUpperTeeth = () => {
      if (
        brush_logs_list.includes(current_brush?.hex ? current_brush.hex : '') ||
        is_locked
      )
        return;

      if (selected_teeth === wireframe_constant.selected_teeth.lower_teeth) {
        applyPointerEvents('none', 'none');

        setLocked(true);
      } else {
        setSelectedTeeth(wireframe_constant.selected_teeth.upper_teeth);
        applyPointerEvents('all', 'none');
      }

      let id: number;

      for (id of teeth.upperTeeth) {
        const el: HTMLElement | null = document.getElementById(`Dot_${id}`);
        if (el) {
          changeDotColor(el);
          el.style.visibility = 'visible';
        }
      }

      equalAllDots();
      updateRecommendList(
        current_brush,
        'insert',
        wireframe_constant.recommend_desc.upper_row
      );
    };

    const setLowerTeeth = async () => {
      if (
        brush_logs_list.includes(current_brush?.hex ? current_brush.hex : '') ||
        is_locked
      )
        return;

      if (selected_teeth === wireframe_constant.selected_teeth.upper_teeth) {
        applyPointerEvents('none', 'none');
        setLocked(true);
      } else {
        setSelectedTeeth(wireframe_constant.selected_teeth.lower_teeth);
        applyPointerEvents('none', 'all');
      }

      let id: number;

      for (id of teeth.lowerTeeth) {
        const el: HTMLElement | null = document.getElementById(`Dot_${id}`);
        if (el) {
          changeDotColor(el);
          el.style.visibility = 'visible';
        }
      }

      equalAllDots();
      updateRecommendList(
        current_brush,
        'insert',
        wireframe_constant.recommend_desc.lower_row
      );
    };

    const handlePointerEvents = () => {
      let lower_pointer_event: string;
      let upper_pointer_event: string;

      if (is_locked) {
        console.log('islocked');
        applyPointerEvents('none', 'none');
        return;
      }

      if (!selected_teeth) {
        if (current_brush?.hex) {
          if (!brush_logs_list.includes(current_brush?.hex)) {
            lower_pointer_event = 'all';
            upper_pointer_event = 'all';
          } else {
            lower_pointer_event = 'none';
            upper_pointer_event = 'none';
          }
        } else {
          lower_pointer_event = 'none';
          upper_pointer_event = 'none';
        }
      } else if (
        !brush_logs_list.includes(current_brush?.hex ? current_brush.hex : '')
      ) {
        if (selected_teeth === wireframe_constant.selected_teeth.upper_teeth) {
          lower_pointer_event = 'all';
          upper_pointer_event = 'none';
        } else {
          lower_pointer_event = 'none';
          upper_pointer_event = 'all';
        }
      } else {
        lower_pointer_event = 'none';
        upper_pointer_event = 'none';
      }
      applyPointerEvents(lower_pointer_event, upper_pointer_event);
    };

    const catchClickSVG = (e: any) => {
      if (active_step === 1) {
        catchClickStepOne(e);
      } else if (active_step === 2) {
        catchClickStepTwo(e);
      } else if (active_step === 3) {
        catchClickStepThree(e);
      }
    };

    const checkMissingTeeth = (e: any) => {
      const el: HTMLElement | null = e.target.parentElement;

      if (el) {
        if (el.id) {
          if (el.id.search('H_') === 0) {
            return el.id.replace('H', 'G');
          }
          if (el.id.search('G_') === 0) {
            return el.id;
          }
        }

        const el_parent: HTMLElement | null = el.parentElement;
        if (el_parent) {
          if (el_parent.id) {
            if (el_parent.id.search('H_') === 0) {
              return el_parent.id.replace('H', 'G');
            }
            if (el_parent.id.search('G_') === 0) {
              return el_parent.id;
            }
          }
        }
      }
      return false;
    };

    const checkEntireTeeth = (e: any) => {
      const el: HTMLElement | null = e.target.parentElement;

      if (el) {
        if (el.id) {
          if (el.id.search('H_') === 0) {
            return el.id.replace('H', 'B');
          }
          if (el.id.search('B_') === 0) {
            return el.id;
          }
        }

        const el_parent: HTMLElement | null = el.parentElement;
        if (el_parent) {
          if (el_parent.id) {
            if (el_parent.id.search('H_') === 0) {
              return el_parent.id.replace('H', 'B');
            }
            if (el_parent.id.search('B_') === 0) {
              return el_parent.id;
            }
          }
        }
      }
      return false;
    };

    const catchClickStepThree = (e: any) => {
      const id = checkMissingTeeth(e);
      if (id) {
        const el: HTMLElement | null = document.getElementById(id);

        if (el) {
          el.style.visibility =
            el.style.visibility !== 'visible' ? 'visible' : 'hidden';
          setMissingList(parseInt(id.replace('G_', ''), 10));
        }

        const el_overlaped: HTMLElement | null = document.getElementById(
          id.replace('G', 'H')
        );

        if (el_overlaped && el) {
          el_overlaped.style.visibility =
            el.style.visibility !== 'visible' ? 'visible' : 'hidden';
        }
      }
    };

    const catchClickStepTwo = (e: any) => {
      if (selected_opt === 'no') return;

      const id = checkEntireTeeth(e);
      if (id) {
        const el: HTMLElement | null = document.getElementById(id);

        if (el) {
          el.style.visibility =
            el.style.visibility !== 'visible' ? 'visible' : 'hidden';
          setBridgeList(parseInt(id.replace('B_', ''), 10));
        }

        const el_overlaped: HTMLElement | null = document.getElementById(
          id.replace('B', 'H')
        );
        if (el_overlaped && el) {
          el_overlaped.style.visibility =
            el.style.visibility !== 'visible' ? 'visible' : 'hidden';
        }
      }
    };

    const catchClickStepOne = (e: any) => {
      if (!current_brush?.hex) return;
      if (brush_logs_list.includes(current_brush?.hex)) return;

      if (
        highlight.upperTeeth.includes(e.target.id) &&
        selected_teeth !== wireframe_constant.selected_teeth.upper_teeth
      ) {
        const index: number = highlight.upperTeeth.indexOf(e.target.id);
        const el: HTMLElement | null = document.getElementById(
          `Dot_${teeth.upperTeeth[index]}`
        );

        if (el) {
          el.style.visibility =
            el.style.visibility === 'visible' ? 'hidden' : 'visible';
          changeDotColor(el);
          if (el.style.visibility === 'visible')
            updateRecommendList(current_brush, 'insert', `[${display_number}]`);
          else updateRecommendList(current_brush, 'remove', display_number);
        }
      }
      if (
        highlight.lowerTeeth.includes(e.target.id) &&
        selected_teeth !== wireframe_constant.selected_teeth.lower_teeth
      ) {
        const index: number = highlight.lowerTeeth.indexOf(e.target.id);
        const el: HTMLElement | null = document.getElementById(
          `Dot_${teeth.lowerTeeth[index]}`
        );
        if (el) {
          el.style.visibility =
            el.style.visibility === 'visible' ? 'hidden' : 'visible';
          changeDotColor(el);
          if (el.style.visibility === 'visible')
            updateRecommendList(current_brush, 'insert', `[${display_number}]`);
          else updateRecommendList(current_brush, 'remove', display_number);
        }
      }
      equalAllDots();
    };

    const catchTeethNumber = (e: any) => {
      if (active_step === 1) {
        if (!current_brush?.hex) return;

        if (e.target.id.search('S_') === 0) {
          const fragments: string[] = e.target.id.split('_');
          setDisplayedNumber(`${fragments[1]}|${fragments[2]}`);
          return;
        }
      } else if (active_step === 2) {
        const id = checkEntireTeeth(e);

        if (id) {
          setDisplayedNumber(id.replace('B_', ''));
          return;
        }
      } else if (active_step === 3) {
        const id = checkMissingTeeth(e);

        if (id) {
          setDisplayedNumber(id.replace('G_', ''));
          return;
        }
      }

      setDisplayedNumber('');
    };

    const clearAllDots = () => {
      let index: number = 0;

      while (index <= 30) {
        const el: HTMLElement | null = document.getElementById(
          `Dot_${index + 1}`
        );
        if (el) {
          el.style.visibility = 'hidden';
        }
        index += 1;
      }

      setSelectedTeeth('');
      setLocked(false);
      applyPointerEvents('all', 'all');
    };

    const equalAllDots = () => {
      let equal_colors: Boolean = true;
      const el: HTMLElement | null = document.getElementById(`Dot_1`);

      let temp_color: string = getDotColor(el) || '';

      let index: number = 0;

      while (index < 30) {
        const temp_el: HTMLElement | null = document.getElementById(
          `Dot_${index + 1}`
        );
        if (temp_el) {
          if (equal_colors && temp_el.style.visibility === 'visible') {
            if (getDotColor(temp_el) !== temp_color) equal_colors = false;
            else temp_color = getDotColor(temp_el) || '';
          } else {
            equal_colors = false;
            break;
          }
        }
        index += 1;
      }
      if (equal_colors) {
        setSelectedTeeth('');
        setLocked(false);
        applyForEntireMouth();
      }
    };

    const filledAllDots = () => {
      let is_filled: Boolean = true;
      let index: number = 0;

      while (index < 30) {
        const el: HTMLElement | null = document.getElementById(
          `Dot_${index + 1}`
        );
        if (el) {
          if (el.style.visibility !== 'visible') {
            is_filled = false;
            break;
          }
        }
        index += 1;
      }
      if (is_filled) {
        clearAllDots();
        setSelectedTeeth('');
        setLocked(false);
      }
    };

    const resetSVG = async () => {
      bridge_list.forEach(bridge => {
        const el_blue: HTMLElement | null = document.getElementById(
          `B_${bridge}`
        );
        if (el_blue) {
          el_blue.style.visibility = '';
        }
      });

      missing_list.forEach(missing => {
        const el_missing: HTMLElement | null = document.getElementById(
          `G_${missing}`
        );
        if (el_missing) {
          el_missing.style.visibility = '';
        }
      });

      bridge_list.forEach(teeth_el => {
        const el_teeth: HTMLElement | null = document.getElementById(
          `N_${teeth_el}`
        );
        if (el_teeth) {
          el_teeth.style.visibility = '';
        }
      });

      bridge_list.forEach(hover_bridge => {
        const el_hover: HTMLElement | null = document.getElementById(
          `H_${hover_bridge}`
        );
        if (el_hover) {
          el_hover.style.visibility = '';
        }
      });

      missing_list.forEach(hover_missing => {
        const el_hover: HTMLElement | null = document.getElementById(
          `H_${hover_missing}`
        );
        if (el_hover) {
          el_hover.style.visibility = '';
        }
      });

      setBrushLogsList([]);
      setLoaded(false);
      setRecommendedList([]);
      setBridgeList(100);
      setMissingList(100);

      clearAllDots();

      if (!current_brush?.hex) applyPointerEvents('none', 'none');
    };

    const initializeStepOne = () => {
      const el_Selected_teeth: HTMLElement | null =
        document.getElementById('Selected_teeth');
      if (el_Selected_teeth) {
        el_Selected_teeth.style.visibility = 'visible';
      }

      const el_Teeth_numbers: HTMLElement | null =
        document.getElementById('Teeth_numbers');
      if (el_Teeth_numbers) {
        el_Teeth_numbers.style.visibility = 'visible';
      }

      const el_Teeth_pink_hover: HTMLElement | null =
        document.getElementById(`Teeth_pink_hover`);
      if (el_Teeth_pink_hover) {
        el_Teeth_pink_hover.style.visibility = 'hidden';
      }

      const el_Teeth_blue_brygga_selected: HTMLElement | null =
        document.getElementById('Teeth_blue_brygga_selected');
      if (el_Teeth_blue_brygga_selected) {
        el_Teeth_blue_brygga_selected.style.visibility = 'hidden';
      }
    };

    const initializeStepTwo = (selectedOpt: string) => {
      const el_Selected_teeth: HTMLElement | null =
        document.getElementById('Selected_teeth');
      if (el_Selected_teeth) {
        el_Selected_teeth.style.visibility = 'hidden';
        el_Selected_teeth.style.pointerEvents = 'none';
      }

      const el_Teeth_numbers: HTMLElement | null =
        document.getElementById('Teeth_numbers');
      if (el_Teeth_numbers) {
        el_Teeth_numbers.style.visibility = 'hidden';
        el_Teeth_numbers.style.pointerEvents = 'none';
      }

      applyPointerEvents('none', 'none');
      setDisplayedNumber('');

      const el_Teeth_pink_hover: HTMLElement | null =
        document.getElementById(`Teeth_pink_hover`);
      if (el_Teeth_pink_hover) {
        el_Teeth_pink_hover.style.visibility = 'visible';
        if (selectedOpt === 'yes') {
          el_Teeth_pink_hover.style.pointerEvents = 'all';
        } else {
          el_Teeth_pink_hover.style.pointerEvents = 'none';
        }
      }

      const el_Teeth_blue_brygga_selected: HTMLElement | null =
        document.getElementById('Teeth_blue_brygga_selected');
      if (el_Teeth_blue_brygga_selected) {
        el_Teeth_blue_brygga_selected.style.visibility = 'visible';
      }
    };

    const initializeStepThree = () => {
      bridge_list.forEach(el_bridge => {
        const el_Teeth: HTMLElement | null = document.getElementById(
          `N_${el_bridge}`
        );
        if (el_Teeth) {
          el_Teeth.style.visibility = 'hidden';
        }
      });

      const el_Selected_teeth: HTMLElement | null =
        document.getElementById('Selected_teeth');
      if (el_Selected_teeth) {
        el_Selected_teeth.style.visibility = 'hidden';
        el_Selected_teeth.style.pointerEvents = 'none';
      }

      const el_Grey_teeth: HTMLElement | null = document.getElementById(
        'Teeth_grey_selected'
      );
      if (el_Grey_teeth) {
        el_Grey_teeth.style.visibility = 'visible';
      }

      const el_Teeth_pink_hover: HTMLElement | null =
        document.getElementById(`Teeth_pink_hover`);
      if (el_Teeth_pink_hover) {
        el_Teeth_pink_hover.style.visibility = 'visible';
        el_Teeth_pink_hover.style.pointerEvents = 'all';
      }
    };

    const initializeStepFourth = () => {
      const el_Teeth_pink_hover: HTMLElement | null =
        document.getElementById(`Teeth_pink_hover`);
      if (el_Teeth_pink_hover) {
        el_Teeth_pink_hover.style.pointerEvents = 'none';
      }
    };

    React.useEffect(() => {
      if (active_step === 1) {
        initializeStepOne();
        if (overview_opened) {
          applyPointerEvents('none', 'none');
        } else {
          setCurrentBrush({
            ...active_brush,
            description: '',
          });

          if (active_brush.hex) {
            if (!is_locked) filledAllDots();
          } else {
            applyPointerEvents('none', 'none');
          }
        }
      } else if (active_step === 2) {
        initializeStepTwo(selected_opt);
      } else if (active_step === 3) {
        initializeStepThree();
      } else {
        initializeStepFourth();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active_brush, active_step, selected_opt, overview_opened]);

    React.useEffect(() => {
      if (current_brush?.hex) handlePointerEvents();
      else {
        setDisplayedNumber('');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current_brush]);

    React.useImperativeHandle(ref, () => ({
      call_resetSVG() {
        resetSVG();
      },
      call_applyPointerEvents(
        lower_pointer_event: string,
        upper_pointer_event: string
      ) {
        applyPointerEvents(lower_pointer_event, upper_pointer_event);
      },
      call_delete_recommend_brush(index: number, list: IRecommendBrush[]) {
        deleteRecommendBrush(index, list);
      },
    }));

    return (
      <>
        {/* ---------------------------------- */}
        {/* UPPER TEETH */}
        <Box className="top-box noselect">
          {visible_btn === false &&
          !brush_logs_list.length &&
          active_step === 1 ? (
            <Typography
              variant="h2"
              align="center"
              sx={{ opacity: !current_brush?.hex ? '0.5' : '1' }}
            >
              <FormattedMessage id="upper_teeth" />
            </Typography>
          ) : (
            <></>
          )}
          {active_step === 1 &&
          visible_btn !== false &&
          !brush_logs_list.length ? (
            <Button
              variant="contained"
              className="global-button"
              disableElevation
              onClick={applyForEntireMouth}
            >
              <FormattedMessage id="apply_entire_mouth" />
            </Button>
          ) : (
            <></>
          )}
        </Box>
        {/* ---------------------------------- */}
        <Box
          className="expanding"
          onClick={applyForEntireMouth}
          sx={{
            opacity: !current_brush?.hex ? '0.5' : '1',
            pointerEvents:
              !current_brush?.hex || overview_opened || active_step === 4
                ? 'none'
                : 'all',
          }}
        >
          {isLoaded && (
            <>
              <Typography variant="h6" className="noselect" sx={{ pb: 3 }}>
                <FormattedMessage id="entire_mouth" />
              </Typography>
              <Box className="line">
                {brush_logs_list.map((brush, index) => (
                  <Box
                    className="middle-dot"
                    key={index}
                    sx={{ background: `${brush} !important` }}
                  >
                    <img src={CheckIcon} alt="check" />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Box>
        {/* ---------------------------------- */}
        {/* TEETH SVG IMAGE */}
        <Grid container direction="row" justifyContent="space-between">
          <Grid item xs={1} className="middle-left noselect">
            <Typography
              variant="h5"
              sx={{
                opacity: !current_brush?.hex || active_step === 0 ? '0.5' : '1',
              }}
            >
              R
            </Typography>
          </Grid>
          <Grid
            item
            xs={10}
            onClick={catchClickSVG}
            onMouseOver={catchTeethNumber}
            sx={{
              opacity: !current_brush?.hex || active_step === 0 ? '0.5' : '1',
            }}
          >
            <TeethSvg className="middle-svg" />
          </Grid>
          <Grid item xs={1} className="middle-right noselect">
            <Typography
              variant="h5"
              sx={{
                opacity: !current_brush?.hex || active_step === 0 ? '0.5' : '1',
              }}
            >
              L
            </Typography>
          </Grid>

          {/* {visible_btn && !is_locked ? (
            <Typography variant="h1" align="center" className="selected-tooth">
              {display_number}
            </Typography>
          ) : (
            <></>
          )} */}
        </Grid>
        {/* ---------------------------------- */}
        <Grid container direction="column" className="button-box">
          <Grid item xs={12}>
            {active_step === 1 &&
            visible_btn !== false &&
            !is_locked &&
            !brush_logs_list.includes(
              current_brush?.hex ? current_brush.hex : ''
            ) &&
            selected_teeth !== wireframe_constant.selected_teeth.upper_teeth ? (
              <Button
                variant="contained"
                className="upper-button"
                onClick={setUpperTeeth}
                disableElevation
              >
                <FormattedMessage id="select_upper_teeth" />
              </Button>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item xs={12}>
            {}
          </Grid>
          <Grid item xs={12}>
            {active_step === 1 &&
            visible_btn !== false &&
            !is_locked &&
            !brush_logs_list.includes(
              current_brush?.hex ? current_brush.hex : ''
            ) &&
            selected_teeth !== wireframe_constant.selected_teeth.lower_teeth ? (
              <Button
                variant="contained"
                className="lower-button"
                onClick={setLowerTeeth}
                disableElevation
              >
                <FormattedMessage id="select_lower_teeth" />
              </Button>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
        {/* ---------------------------------- */}
        {/* LOWER TEETH */}
        <Box className="bottom-box noselect">
          {visible_btn === false &&
          !brush_logs_list.length &&
          active_step === 1 ? (
            <Typography
              variant="h2"
              align="center"
              sx={{ opacity: !current_brush?.hex ? '0.5' : '1' }}
            >
              <FormattedMessage id="lower_teeth" />
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      </>
    );
  }
);

export default Wireframe;
