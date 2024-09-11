import { expect, test } from 'vitest'

import { getPercentageMatch } from '../src/services/pixelmatch'
import path from 'path'
import fs from 'fs'

test('pixelmatch', () => {
  const image1 = fs.readFileSync(path.resolve(__dirname, 'resources/images/img2.png'));
  const image2 = path.resolve(__dirname, 'resources/images/img1.png');

  const percentageMatch = getPercentageMatch(image1, image2);

  expect(percentageMatch).toBe("100.0");

})