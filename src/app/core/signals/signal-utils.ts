import { linkedSignal, resource, signal } from '@angular/core';
import { CatalogService } from '../services/catalog.service';

export function createProductResource(catalog: CatalogService, slug: string) {
  return resource({
    params: () => ({ slug }),
    loader: async ({ params }) => {
      await new Promise(r => setTimeout(r, 100));
      const product = catalog.getProductBySlug(params.slug);
      if (!product) throw new Error('Product not found');
      return product;
    },
  });
}

export function createSearchResource(catalog: CatalogService, query: string) {
  return resource({
    params: () => ({ query }),
    loader: async ({ params }) => {
      if (!params.query.trim()) return [];
      await new Promise(r => setTimeout(r, 150));
      return catalog.search(params.query).slice(0, 10);
    },
  });
}

export function createCategoryProductsResource(catalog: CatalogService, categorySlug: string) {
  return resource({
    params: () => ({ categorySlug }),
    loader: async ({ params }) => {
      if (!params.categorySlug) return [];
      await new Promise(r => setTimeout(r, 100));
      return catalog.getProductsByCategory(params.categorySlug);
    },
  });
}

export interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  dirty: boolean;
  submitting: boolean;
}

export function createFormSignal<T extends Record<string, unknown>>(
  initialValues: T,
  validators?: Partial<Record<keyof T, (value: unknown) => string | null>>
): {
  form: ReturnType<typeof signal<FormState<T>>>;
  setValue: (field: keyof T, value: unknown) => void;
  setError: (field: keyof T, error: string | null) => void;
  setTouched: (field: keyof T) => void;
  validate: () => boolean;
  reset: () => void;
  submit: () => Promise<void>;
} {
  const form = signal<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    dirty: false,
    submitting: false,
  });

  const setValue = (field: keyof T, value: unknown) => {
    form.update(f => ({
      ...f,
      values: { ...f.values, [field]: value },
      dirty: true,
      errors: validators?.[field] ? { ...f.errors, [field]: validators[field]!(value) } : f.errors,
    }));
  };

  const setError = (field: keyof T, error: string | null) => {
    form.update(f => ({
      ...f,
      errors: { ...f.errors, [field]: error ?? undefined },
    }));
  };

  const setTouched = (field: keyof T) => {
    form.update(f => ({
      ...f,
      touched: { ...f.touched, [field]: true },
    }));
  };

  const validate = () => {
    let valid = true;
    const errors: Partial<Record<keyof T, string>> = {};
    if (validators) {
      for (const [field, validator] of Object.entries(validators)) {
        const error = validator?.(form().values[field as keyof T]);
        if (error) {
          errors[field as keyof T] = error;
          valid = false;
        }
      }
    }
    form.update(f => ({ ...f, errors: { ...f.errors, ...errors }, touched: Object.keys(f.values).reduce((acc, k) => ({ ...acc, [k]: true }), {}) }));
    return valid;
  };

  const reset = () => {
    form.set({ values: initialValues, errors: {}, touched: {}, dirty: false, submitting: false });
  };

  const submit = async () => {
    if (!validate()) return;
    form.update(f => ({ ...f, submitting: true }));
    await new Promise(r => setTimeout(r, 1000));
    form.update(f => ({ ...f, submitting: false }));
  };

  return { form, setValue, setError, setTouched, validate, reset, submit };
}

export function createLinkedSignalExample() {
  const source = signal<string[]> (['sofa', 'bed']);
  const derived = linkedSignal({
    source,
    computation: (arr) => arr.map(s => s.toUpperCase()),
  });
  return { source, derived };
}
