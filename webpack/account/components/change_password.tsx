import * as React from "react";
import { t } from "i18next";
import {
  BlurableInput,
  Widget,
  WidgetHeader,
  WidgetBody,
  SaveBtn
} from "../../ui";
import { ChangePwPropTypes } from "../interfaces";

export class ChangePassword extends React.Component<ChangePwPropTypes, {}> {
  render() {
    let { set, save, password, new_password } = this.props;
    let npc = this.props.new_password_confirmation;
    let npcString = "new_password_confirmation";

    let isSaving = this.props.user.saving;
    let isDirty = this.props.user.dirty;
    let isSaved = !isSaving && !isDirty;

    return (
      <Widget>
        <WidgetHeader title="Change Password">
          <SaveBtn
            onClick={save}
            isDirty={isDirty}
            isSaving={isSaving}
            isSaved={isSaved}
          />
          {/* <button
            onClick={save}
            className="fb-button green"
          >
            {t("Save")}
          </button> */}
        </WidgetHeader>
        <WidgetBody>
          <form>
            <label>
              {t("Old Password")}
            </label>
            <BlurableInput
              allowEmpty={true}
              onCommit={set}
              name="password"
              value={password || ""}
              type="password"
            />
            <label>
              {t("New Password")}
            </label>
            <BlurableInput
              allowEmpty={true}
              onCommit={set}
              name="new_password"
              value={new_password || ""}
              type="password"
            />
            <label>
              {t("New Password")}
            </label>
            <BlurableInput
              allowEmpty={true}
              onCommit={set}
              name={npcString}
              value={npc || ""}
              type="password"
            />
          </form>
        </WidgetBody>
      </Widget >
    );
  }
}
