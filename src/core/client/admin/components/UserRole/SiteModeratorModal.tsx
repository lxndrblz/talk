import { Localized } from "@fluent/react/compat";
import { FORM_ERROR } from "final-form";
import React, { FunctionComponent, useCallback } from "react";
import { Form } from "react-final-form";

import useCommonTranslation, {
  COMMON_TRANSLATION,
} from "coral-admin/helpers/useCommonTranslation";
import { InvalidRequestError } from "coral-framework/lib/errors";
import {
  Button,
  CallOut,
  Card,
  CardCloseButton,
  Flex,
  HorizontalGutter,
  Modal,
} from "coral-ui/components/v2";

import ModalBodyText from "../ModalBodyText";
import ModalHeader from "../ModalHeader";
import ModalHeaderUsername from "../ModalHeaderUsername";
import SiteModeratorModalSites from "./SiteModeratorModalSites";

import styles from "./SiteModeratorModal.css";

interface Props {
  username: string | null;
  open: boolean;
  onCancel: () => void;
  onFinish: (siteIDs: string[]) => Promise<void>;
  selectedSiteIDs?: string[];
}

const SiteModeratorModal: FunctionComponent<Props> = ({
  username,
  open,
  onFinish,
  onCancel,
  selectedSiteIDs = [],
}) => {
  const notAvailableTranslation = useCommonTranslation(
    COMMON_TRANSLATION.NOT_AVAILABLE
  );
  const onSubmit = useCallback(
    async (values: { siteIDs: string[] }) => {
      try {
        await onFinish(values.siteIDs);
        return;
      } catch (err) {
        if (err instanceof InvalidRequestError) {
          return err.invalidArgs;
        }
        return { [FORM_ERROR]: err.message };
      }
    },
    [onFinish]
  );

  return (
    <Modal
      open={open}
      onClose={onCancel}
      disableScroll
      data-testid="site-moderator-modal"
    >
      {({ firstFocusableRef, lastFocusableRef }) => (
        <Card className={styles.root}>
          <Flex justifyContent="flex-end">
            <CardCloseButton onClick={onCancel} ref={firstFocusableRef} />
          </Flex>
          <Form
            onSubmit={onSubmit}
            initialValues={{ siteIDs: selectedSiteIDs }}
          >
            {({ handleSubmit, submitError, submitting, values }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <HorizontalGutter spacing={3}>
                    <Localized
                      id="community-siteModeratorModal-assignSites"
                      strong={<ModalHeaderUsername />}
                      $username={username || notAvailableTranslation}
                    >
                      <ModalHeader>
                        Assign sites for{" "}
                        <ModalHeaderUsername>{username}</ModalHeaderUsername>
                      </ModalHeader>
                    </Localized>
                    {submitError && (
                      <CallOut color="error" fullWidth>
                        {submitError}
                      </CallOut>
                    )}
                    <Localized id="community-siteModeratorModal-assignSitesDescription">
                      <ModalBodyText>
                        Site moderators are permitted to make moderation
                        decisions and issue suspensions on the sites they are
                        assigned.
                      </ModalBodyText>
                    </Localized>
                    <SiteModeratorModalSites
                      selectedSiteIDs={selectedSiteIDs}
                    />
                    <Flex justifyContent="flex-end" itemGutter="half">
                      <Localized id="community-siteModeratorModal-cancel">
                        <Button variant="flat" onClick={onCancel}>
                          Cancel
                        </Button>
                      </Localized>
                      <Localized id="community-siteModeratorModal-assign">
                        <Button
                          type="submit"
                          disabled={submitting || values.siteIDs.length === 0}
                          ref={lastFocusableRef}
                          data-testid="site-moderator-modal-submitButton"
                        >
                          Assign
                        </Button>
                      </Localized>
                    </Flex>
                  </HorizontalGutter>
                </form>
              );
            }}
          </Form>
        </Card>
      )}
    </Modal>
  );
};

export default SiteModeratorModal;
