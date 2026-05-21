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

import {renderHook, act} from '@testing-library/react'
import {useStudentAntiDistractionFocus} from '../useStudentAntiDistractionFocus'
import {
  STUDENT_ANTI_DISTRACTION_FOCUS_BODY_CLASS,
  STUDENT_ANTI_DISTRACTION_FOCUS_SESSION_KEY,
} from '../constants'

describe('useStudentAntiDistractionFocus', () => {
  beforeEach(() => {
    sessionStorage.clear()
    document.body.classList.remove(STUDENT_ANTI_DISTRACTION_FOCUS_BODY_CLASS)
  })

  it('toggles body class and session storage', () => {
    const {result} = renderHook(() => useStudentAntiDistractionFocus())

    expect(document.body.classList.contains(STUDENT_ANTI_DISTRACTION_FOCUS_BODY_CLASS)).toBe(
      false,
    )

    act(() => {
      result.current.enable()
    })

    expect(result.current.active).toBe(true)
    expect(document.body.classList.contains(STUDENT_ANTI_DISTRACTION_FOCUS_BODY_CLASS)).toBe(true)
    expect(sessionStorage.getItem(STUDENT_ANTI_DISTRACTION_FOCUS_SESSION_KEY)).toBe('true')

    act(() => {
      result.current.disable()
    })

    expect(result.current.active).toBe(false)
    expect(document.body.classList.contains(STUDENT_ANTI_DISTRACTION_FOCUS_BODY_CLASS)).toBe(false)
    expect(sessionStorage.getItem(STUDENT_ANTI_DISTRACTION_FOCUS_SESSION_KEY)).toBeNull()
  })

  it('restores active state from session storage on mount', () => {
    sessionStorage.setItem(STUDENT_ANTI_DISTRACTION_FOCUS_SESSION_KEY, 'true')

    const {result} = renderHook(() => useStudentAntiDistractionFocus())

    expect(result.current.active).toBe(true)
    expect(document.body.classList.contains(STUDENT_ANTI_DISTRACTION_FOCUS_BODY_CLASS)).toBe(true)
  })
})
