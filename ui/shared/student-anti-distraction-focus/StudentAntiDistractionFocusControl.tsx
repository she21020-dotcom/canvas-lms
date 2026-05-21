/*
 * Copyright (C) 2026 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import {useScope as createI18nScope} from '@canvas/i18n'
import {Button} from '@instructure/ui-buttons'
import {Alert} from '@instructure/ui-alerts'
import {Flex} from '@instructure/ui-flex'
import {View} from '@instructure/ui-view'
import {ScreenReaderContent} from '@instructure/ui-a11y-content'
import {useStudentAntiDistractionFocus} from './useStudentAntiDistractionFocus'

const I18n = createI18nScope('student_anti_distraction_focus')

export interface StudentAntiDistractionFocusControlProps {
  margin?: string
}

export function StudentAntiDistractionFocusControl({
  margin = '0 0 small 0',
}: StudentAntiDistractionFocusControlProps) {
  const {active, disable, toggle} = useStudentAntiDistractionFocus()

  return (
    <View as="div" margin={margin} data-testid="student-anti-distraction-focus-control">
      {active ? (
        <Alert
          variant="info"
          liveRegionPoliteness="polite"
          liveRegionRole="alert"
          renderCloseButtonLabel={I18n.t('Exit Study Focus')}
          onDismiss={disable}
          margin="0 0 small 0"
        >
          <Flex alignItems="center" justifyItems="space-between" wrap="wrap">
            <Flex.Item shouldGrow shouldShrink>
              {I18n.t(
                'Study Focus is on. Distractions are hidden so you can work on this activity.',
              )}
            </Flex.Item>
            <Flex.Item>
              <Button color="primary-inverse" onClick={disable} margin="small 0 0 0">
                {I18n.t('Exit Study Focus')}
              </Button>
            </Flex.Item>
          </Flex>
        </Alert>
      ) : (
        <Button
          color="secondary"
          onClick={toggle}
          data-testid="student-anti-distraction-focus-toggle"
        >
          {I18n.t('Study Focus')}
          <ScreenReaderContent>
            {I18n.t('Hides navigation, notifications, and other distractions')}
          </ScreenReaderContent>
        </Button>
      )}
    </View>
  )
}
