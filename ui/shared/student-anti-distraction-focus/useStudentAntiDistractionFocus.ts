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

import {useCallback, useEffect, useState} from 'react'
import {applyBodyFocusClass} from './applyBodyFocusClass'
import {STUDENT_ANTI_DISTRACTION_FOCUS_SESSION_KEY} from './constants'

function readStoredFocusState(): boolean {
  try {
    return sessionStorage.getItem(STUDENT_ANTI_DISTRACTION_FOCUS_SESSION_KEY) === 'true'
  } catch {
    return false
  }
}

function writeStoredFocusState(active: boolean): void {
  try {
    if (active) {
      sessionStorage.setItem(STUDENT_ANTI_DISTRACTION_FOCUS_SESSION_KEY, 'true')
    } else {
      sessionStorage.removeItem(STUDENT_ANTI_DISTRACTION_FOCUS_SESSION_KEY)
    }
  } catch {
    // sessionStorage may be unavailable in some embedded contexts
  }
}

function logFocusToggle(active: boolean): void {
  if (ENV?.RAILS_ENVIRONMENT === 'development') {
    console.debug('[student_anti_distraction_focus]', active ? 'enabled' : 'disabled')
  }
}

export function useStudentAntiDistractionFocus() {
  const [active, setActive] = useState(() => readStoredFocusState())

  useEffect(() => {
    applyBodyFocusClass(active)
    writeStoredFocusState(active)
    logFocusToggle(active)

    return () => {
      applyBodyFocusClass(false)
    }
  }, [active])

  const enable = useCallback(() => setActive(true), [])
  const disable = useCallback(() => setActive(false), [])
  const toggle = useCallback(() => setActive(current => !current), [])

  return {active, enable, disable, toggle}
}
