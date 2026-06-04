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

import {isStudentAntiDistractionFocusEligible} from '../isEligible'

describe('isStudentAntiDistractionFocusEligible', () => {
  afterEach(() => {
    // @ts-expect-error
    window.ENV = {}
  })

  it('returns true when flag and eligibility env are set', () => {
    window.ENV = {
      FEATURES: {student_anti_distraction_focus: true},
      STUDENT_ANTI_DISTRACTION_FOCUS_ELIGIBLE: true,
    }
    expect(isStudentAntiDistractionFocusEligible()).toBe(true)
  })

  it('returns false when feature flag is off', () => {
    window.ENV = {
      FEATURES: {student_anti_distraction_focus: false},
      STUDENT_ANTI_DISTRACTION_FOCUS_ELIGIBLE: true,
    }
    expect(isStudentAntiDistractionFocusEligible()).toBe(false)
  })

  it('returns false when user is not eligible', () => {
    window.ENV = {
      FEATURES: {student_anti_distraction_focus: true},
      STUDENT_ANTI_DISTRACTION_FOCUS_ELIGIBLE: false,
    }
    expect(isStudentAntiDistractionFocusEligible()).toBe(false)
  })

  it('returns true when server eligibility is set even if FEATURES omits the flag', () => {
    window.ENV = {
      FEATURES: {},
      STUDENT_ANTI_DISTRACTION_FOCUS_ELIGIBLE: true,
    }
    expect(isStudentAntiDistractionFocusEligible()).toBe(true)
  })
})
