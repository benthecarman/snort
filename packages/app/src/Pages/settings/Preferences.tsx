import "./Preferences.css";

import { FormattedMessage, useIntl } from "react-intl";
import useLogin from "Hooks/useLogin";
import { updatePreferences, UserPreferences } from "Login";
import { DefaultImgProxy } from "Const";
import { unwrap } from "SnortUtils";
import { useLocale } from "IntlProvider";

import messages from "./messages";

export const AllLanguageCodes = [
  "en",
  "ja",
  "es",
  "hu",
  "zh-CN",
  "zh-TW",
  "fr",
  "ar",
  "it",
  "id",
  "de",
  "ru",
  "sv",
  "hr",
  "ta-IN",
  "fa-IR",
  "th",
  "pt-BR",
  "sw",
  "nl",
  "fi",
];

const PreferencesPage = () => {
  const { formatMessage } = useIntl();
  const login = useLogin();
  const perf = login.preferences;
  const { lang } = useLocale();

  return (
    <div className="preferences flex flex-col g24">
      <h3>
        <FormattedMessage {...messages.Preferences} />
      </h3>

      <div className="flex justify-between w-max">
        <h4>
          <FormattedMessage defaultMessage="Language" />
        </h4>
        <div>
          <select
            value={lang}
            onChange={e =>
              updatePreferences(login, {
                ...perf,
                language: e.target.value,
              })
            }
            style={{ textTransform: "capitalize" }}>
            {AllLanguageCodes.sort().map(a => (
              <option value={a}>
                {new Intl.DisplayNames([a], {
                  type: "language",
                }).of(a)}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex justify-between w-max">
        <h4>
          <FormattedMessage {...messages.Theme} />
        </h4>
        <div>
          <select
            value={perf.theme}
            onChange={e =>
              updatePreferences(login, {
                ...perf,
                theme: e.target.value,
              } as UserPreferences)
            }>
            <option value="system">
              <FormattedMessage {...messages.System} />
            </option>
            <option value="light">
              <FormattedMessage {...messages.Light} />
            </option>
            <option value="dark">
              <FormattedMessage {...messages.Dark} />
            </option>
          </select>
        </div>
      </div>
      <div className="flex justify-between w-max">
        <h4>
          <FormattedMessage {...messages.DefaultRootTab} />
        </h4>
        <div>
          <select
            value={perf.defaultRootTab}
            onChange={e =>
              updatePreferences(login, {
                ...perf,
                defaultRootTab: e.target.value,
              } as UserPreferences)
            }>
            <option value="notes">
              <FormattedMessage defaultMessage="Notes" />
            </option>
            <option value="conversations">
              <FormattedMessage {...messages.Conversations} />
            </option>
            <option value="global">
              <FormattedMessage {...messages.Global} />
            </option>
          </select>
        </div>
      </div>
      <div className="flex justify-between w-max">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage defaultMessage="Send usage metrics" />
          </h4>
          <small>
            <FormattedMessage defaultMessage="Send anonymous usage metrics" />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.telemetry ?? true}
            onChange={e => updatePreferences(login, { ...perf, telemetry: e.target.checked })}
          />
        </div>
      </div>
      <div className="flex w-max">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage {...messages.AutoloadMedia} />
          </h4>
          <small>
            <FormattedMessage {...messages.AutoloadMediaHelp} />
          </small>
          <div className="w-max">
            <select
              className="w-max"
              value={perf.autoLoadMedia}
              onChange={e =>
                updatePreferences(login, {
                  ...perf,
                  autoLoadMedia: e.target.value,
                } as UserPreferences)
              }>
              <option value="none">
                <FormattedMessage {...messages.None} />
              </option>
              <option value="follows-only">
                <FormattedMessage {...messages.FollowsOnly} />
              </option>
              <option value="all">
                <FormattedMessage {...messages.All} />
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-max">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage defaultMessage="Check Signatures" />
          </h4>
          <small>
            <FormattedMessage defaultMessage="Check all event signatures received from relays" />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.checkSigs}
            onChange={e => updatePreferences(login, { ...perf, checkSigs: e.target.checked })}
          />
        </div>
      </div>
      <div className="flex justify-between w-max">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage defaultMessage="Auto Translate" />
          </h4>
          <small>
            <FormattedMessage defaultMessage="Automatically translate notes to your local language" />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.autoTranslate}
            onChange={e => updatePreferences(login, { ...perf, autoTranslate: e.target.checked })}
          />
        </div>
      </div>
      <div className="flex justify-between w-max">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage defaultMessage="Proof of Work" />
          </h4>
          <small>
            <FormattedMessage defaultMessage="Amount of work to apply to all published events" />
          </small>
        </div>
        <div>
          <input
            type="number"
            defaultValue={perf.pow}
            min={0}
            onChange={e => updatePreferences(login, { ...perf, pow: parseInt(e.target.value || "0") })}
          />
        </div>
      </div>
      <div className="flex justify-between w-max">
        <h4>
          <FormattedMessage defaultMessage="Default Zap amount" />
        </h4>
        <div>
          <input
            type="number"
            defaultValue={perf.defaultZapAmount}
            min={1}
            onChange={e => updatePreferences(login, { ...perf, defaultZapAmount: parseInt(e.target.value || "0") })}
          />
        </div>
      </div>
      <div className="flex justify-between w-max">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage defaultMessage="Show Badges" />
          </h4>
          <small>
            <FormattedMessage defaultMessage="Show badges on profile pages" />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.showBadges ?? false}
            onChange={e => updatePreferences(login, { ...perf, showBadges: e.target.checked })}
          />
        </div>
      </div>
      <div className="flex justify-between w-max">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage defaultMessage="Show Status" />
          </h4>
          <small>
            <FormattedMessage defaultMessage="Show status messages on profile pages" />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.showStatus ?? true}
            onChange={e => updatePreferences(login, { ...perf, showStatus: e.target.checked })}
          />
        </div>
      </div>
      <div className="flex justify-between w-max">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage defaultMessage="Auto Zap" />
          </h4>
          <small>
            <FormattedMessage defaultMessage="Automatically zap every note when loaded" />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.autoZap}
            onChange={e => updatePreferences(login, { ...perf, autoZap: e.target.checked })}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col g8">
            <h4>
              <FormattedMessage {...messages.ImgProxy} />
            </h4>
            <small>
              <FormattedMessage {...messages.ImgProxyHelp} />
            </small>
          </div>
          <div>
            <input
              type="checkbox"
              checked={perf.imgProxyConfig !== null}
              onChange={e =>
                updatePreferences(login, {
                  ...perf,
                  imgProxyConfig: e.target.checked ? DefaultImgProxy : null,
                })
              }
            />
          </div>
        </div>
        {perf.imgProxyConfig && (
          <div className="w-max form">
            <div className="form-group">
              <div>
                <FormattedMessage {...messages.ServiceUrl} />
              </div>
              <div className="w-max">
                <input
                  type="text"
                  value={perf.imgProxyConfig?.url}
                  placeholder={formatMessage({
                    defaultMessage: "URL..",
                    description: "Placeholder text for imgproxy url textbox",
                  })}
                  onChange={e =>
                    updatePreferences(login, {
                      ...perf,
                      imgProxyConfig: {
                        ...unwrap(perf.imgProxyConfig),
                        url: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <FormattedMessage {...messages.ServiceKey} />
              </div>
              <div className="w-max">
                <input
                  type="password"
                  value={perf.imgProxyConfig?.key}
                  placeholder={formatMessage({
                    defaultMessage: "Hex Key..",
                    description: "Hexidecimal 'key' input for improxy",
                  })}
                  onChange={e =>
                    updatePreferences(login, {
                      ...perf,
                      imgProxyConfig: {
                        ...unwrap(perf.imgProxyConfig),
                        key: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="form-group">
              <div>
                <FormattedMessage {...messages.ServiceSalt} />
              </div>
              <div className="w-max">
                <input
                  type="password"
                  value={perf.imgProxyConfig?.salt}
                  placeholder={formatMessage({
                    defaultMessage: "Hex Salt..",
                    description: "Hexidecimal 'salt' input for imgproxy",
                  })}
                  onChange={e =>
                    updatePreferences(login, {
                      ...perf,
                      imgProxyConfig: {
                        ...unwrap(perf.imgProxyConfig),
                        salt: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between w-max">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage {...messages.EnableReactions} />
          </h4>
          <small>
            <FormattedMessage {...messages.EnableReactionsHelp} />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.enableReactions}
            onChange={e => updatePreferences(login, { ...perf, enableReactions: e.target.checked })}
          />
        </div>
      </div>
      <div className="flex flex-col g8">
        <h4>
          <FormattedMessage {...messages.ReactionEmoji} />
        </h4>
        <small>
          <FormattedMessage {...messages.ReactionEmojiHelp} />
        </small>
        <input
          type="text"
          value={perf.reactionEmoji}
          onChange={e => {
            const split = e.target.value.match(/[\p{L}\S]{1}/u);
            console.debug(e.target.value, split);
            updatePreferences(login, {
              ...perf,
              reactionEmoji: split?.[0] ?? "",
            });
          }}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage {...messages.ConfirmReposts} />
          </h4>
          <small>
            <FormattedMessage {...messages.ConfirmRepostsHelp} />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.confirmReposts}
            onChange={e => updatePreferences(login, { ...perf, confirmReposts: e.target.checked })}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage {...messages.ShowLatest} />
          </h4>
          <small>
            <FormattedMessage {...messages.ShowLatestHelp} />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.autoShowLatest}
            onChange={e => updatePreferences(login, { ...perf, autoShowLatest: e.target.checked })}
          />
        </div>
      </div>
      <div className="flex flex-col g8">
        <h4>
          <FormattedMessage {...messages.FileUpload} />
        </h4>
        <small>
          <FormattedMessage {...messages.FileUploadHelp} />
        </small>
        <select
          value={perf.fileUploader}
          onChange={e =>
            updatePreferences(login, {
              ...perf,
              fileUploader: e.target.value,
            } as UserPreferences)
          }>
          <option value="void.cat">
            void.cat <FormattedMessage {...messages.Default} />
          </option>
          <option value="nostr.build">nostr.build</option>
          <option value="nostrimg.com">nostrimg.com</option>
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col g8">
          <h4>
            <FormattedMessage {...messages.DebugMenus} />
          </h4>
          <small>
            <FormattedMessage {...messages.DebugMenusHelp} />
          </small>
        </div>
        <div>
          <input
            type="checkbox"
            checked={perf.showDebugMenus}
            onChange={e => updatePreferences(login, { ...perf, showDebugMenus: e.target.checked })}
          />
        </div>
      </div>
    </div>
  );
};
export default PreferencesPage;
