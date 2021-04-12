import * as React from 'react'
import { renderHook } from '@testing-library/react-hooks';
import useProducts from '../useProducts';

describe('useProducts()', () => {
	it('returns empty array before array gets populates', () => {
		let result;
		renderHook(() => {
			result = useProducts();
			expect(result).toBe([]);
		});
		expect(result).not.toBe([]);
	});

	it('returns an array of products', () => {
		let result;
		renderHook(() => {
			result = useProducts();
		});
		expect(result).not.toBe([]);
		expect(result.length).toBeGreaterThan(0);
		expect(result[0].id).toBeDefined();
		expect(result[0].name).toBeDefined();
		expect(result[0].rating).toBeDefined();
	});
});