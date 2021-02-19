import React, { Fragment } from 'react'
import classnames from 'classnames'

import QuickActions from './QuickActions.es6.js'
import SidebarBackButton from './SidebarBackButton.es6.js'
import SidebarHeaderActionButton from './SidebarHeaderActionButton.es6.js'
import Button from '../../../form/button/Button.es6.js'
import { Home } from '../../../Icons.es6.js'

class SidebarHeader extends React.Component {
  state = {
    actionsVisible: false,
    actionsAvailable: false
  }

  actionsRef = React.createRef()

  static getDerivedStateFromProps ({ quickActions }, prevState) {
    const actionsAvailable = Array.isArray(quickActions) && quickActions.length > 0
    if (actionsAvailable !== prevState.actionsAvailable) {
      return { actionsAvailable }
    }

    return null
  }

  componentDidMount () {
    document.addEventListener('click', this.onDocumentClick, false)
    document.addEventListener('touchend', this.onDocumentClick, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.onDocumentClick, false)
    document.removeEventListener('touchend', this.onDocumentClick, false)
  }

  onDocumentClick = (event) => {
    if (!this.actionsRef || !this.actionsRef.current) {
      return
    }

    if (!this.actionsRef.current.contains(event.target) && this.state.actionsVisible) {
      this.setState({ actionsVisible: false })
    }
  }

  onAction = () => {
    this.props.onAction()

    if (this.state.actionsAvailable) {
      this.setState(({ actionsVisible }) => ({
        actionsVisible: !actionsVisible
      }))
    }
  }

  render () {
    const {
      actionIcon,
      backButton,
      backButtonText,
      tabbedNavigation,
      children,
      dropdownMenuLabel,
      homeButton,
      isScrollingDown,
      leftAction,
      onBack,
      onHomeClick,
      onQuickActionSelected,
      progress,
      quickActions,
      quickDialog,
      showLogo,
      steps,
      title
    } = this.props
    const { actionsAvailable, actionsVisible } = this.state

    return (
      <Fragment>
        <div className="ds-sidebar__header">
          <div className="ds-sidebar__header-back">
            {showLogo && (
              <svg className="ds-sidebar__header-logo" id="b12-logo" viewBox="0 0 179.8 79.2" xmlns="http://www.w3.org/2000/svg"><title>B12</title><path d="M53.9,46a12.87,12.87,0,0,0-4.6-2.9c-2.5-.8-3.2-.9-10.1-.9H28.3V69.5h10c9.2,0,10.5-.2,13.8-2.2s5.4-6.4,5.4-11.3c0-4.2-1.3-7.7-3.6-10M51.6,11.4A9.44,9.44,0,0,0,47.1,9c-2.3-.6-3.5-.6-10-.6H28.2V33.2h11c4.4,0,8-.6,10.2-1.6,3.5-1.5,5.8-5.8,5.8-10.7a12.37,12.37,0,0,0-3.6-9.5M71.8,68.5a16,16,0,0,1-6.1,6.3,19.75,19.75,0,0,1-9,2.8c-1.6.1-4.5.1-8.6.1H0V69.3H6.4a9.59,9.59,0,0,0,4-.5,3.35,3.35,0,0,0,1.5-1.6,5.59,5.59,0,0,0,.7-2.6c0-.6.1-1.6.1-3.3v-45c0-1.5-.1-2.7-.1-3.3a5.36,5.36,0,0,0-.7-2.6c-.7-1.6-2.1-2.1-5.5-2.1H0V0H36.6c3.9,0,6.9.1,9,.1C54,.3,60,2,65.1,5.6A17,17,0,0,1,72.3,20a16.15,16.15,0,0,1-5.4,12.6c-2.8,2.6-4.8,3.6-10.1,5.1,5.4,1.4,6.9,2,10,4,4.9,3,7.8,9,7.8,15.8a23,23,0,0,1-2.8,11" fill="#6548c7"></path><path d="M78.5,77.7V69.3h7a12,12,0,0,0,3.9-.4,3.71,3.71,0,0,0,1.4-1.6,5.53,5.53,0,0,0,.7-2.5c0-.6.1-1.6.1-3V29.2H78.5V21.7c10.7-.1,14.1-2.2,16.8-10.4h10V58.5l.1,3.3a19.58,19.58,0,0,0,.1,3,5.73,5.73,0,0,0,.6,2.5c.8,1.6,2,2,5.4,2H118v8.4Z" fill="#6548c7"></path><path d="M179.2,64.3c-1.4,9.8-7.4,14.9-17.1,14.9-5.5,0-9.9-1.4-20.3-6.5-3-1.4-4.7-2-6.2-2-3.2,0-5.1,1.9-5.1,5.3v1.6h-7.7c-.1-1.1-.1-2-.1-2.6a33.4,33.4,0,0,1,2.1-11.4c2.5-6.5,6.8-10.6,16.3-15.2q6.45-3.15,9-4.5a24.88,24.88,0,0,0,6.4-4.6,13.54,13.54,0,0,0,3.9-9.2c0-7.7-5.6-12.5-14.6-12.5-7.8,0-12.2,2.8-14,8.9a9,9,0,0,1,4.2-1.1c4.3,0,7.4,3.3,7.4,7.9,0,5.3-3.5,8.8-8.8,8.8-6.5,0-10.8-4.8-10.8-12a19.15,19.15,0,0,1,6.9-14.5c4.9-4.2,10.8-6.1,19.4-6.1,15.9,0,26.7,8.8,26.7,21.9,0,10.9-6.2,17-21,20.9C142,56,140.6,56.5,136,60.4c-2.3,1.9-3.2,3.2-4.2,6.6,3.4-2.8,5.8-3.7,10.5-3.7a27.28,27.28,0,0,1,4.1.3l9.7,1.6a46.32,46.32,0,0,0,6.2.6c7.5,0,10.7-3.3,10.8-11.7H180a100.9,100.9,0,0,1-.8,10.2" fill="#6548c7"></path></svg>
            )}

            {!showLogo && backButton && onBack && (
              <SidebarBackButton
                text={backButtonText}
                hideText={isScrollingDown}
                onClick={onBack}
              />
            )}

            {!showLogo && !backButton && leftAction}

            {homeButton && (
              <React.Fragment>
                <div className="ds-sidebar__header-divider" />
                {!isScrollingDown && (
                  <Button
                    small
                    className="ds-sidebar__header-home"
                    icon={<Home />}
                    onClick={onHomeClick}
                  />
                )}
              </React.Fragment>
            )}

            {isScrollingDown && <div>{title}</div>}
          </div>

          {!children && steps && (
            <div className="ds-sidebar__header-title">
              {title}
              <div className="ds-sidebar__header-steps">{steps}</div>
            </div>
          )}

          {children}

          <div
            className={classnames({
              'ds-dropdown': actionsAvailable && actionIcon,
              'ds-dropdown--right': actionsAvailable && actionIcon,
              'ds-dropdown--menu-visible': actionsAvailable && actionsVisible,
              'ds-sidebar__header-action': !actionsAvailable
            })}
            ref={this.actionsRef}
          >
            {actionIcon && (
              <SidebarHeaderActionButton
                dropdown={actionsAvailable}
                icon={actionIcon}
                onClick={this.onAction}
              />
            )}

            {quickDialog}

            {actionsVisible && (
              <QuickActions
                actions={quickActions}
                label={dropdownMenuLabel}
                onSelect={(idx) => {
                  this.setState({ actionsVisible: false }, () => {
                    onQuickActionSelected && onQuickActionSelected(idx)
                  })
                }}
              />
            )}
          </div>
          <div
            className="ds-sidebar__header-progress"
            style={{width: `${progress}%`}}
          />
        </div>
        {tabbedNavigation && <div className="ds-sidebar__tabbed-nav">
          {tabbedNavigation}
        </div>}
      </Fragment>
    )
  }
}

SidebarHeader.defaultProps = {
  title: '',
  dropdownMenuLabel: '',
  onBack: () => {},
  backButton: false,
  onAction: () => {},
  actionIcon: null,
  homeButton: false,
  isScrollingDown: false,
  progress: 0,
  quickActions: [],
  showLogo: false,
  quickDialog: null,
  tabbedNavigation: null
}

export default SidebarHeader