import { useBuilder } from "../../context/BuilderContext";
import { AccordionStep } from "../accordion/AccordionStep";
import { ProductCard } from "../product/ProductCard";
import { steps } from "../../data/steps";
import { useResponsive } from "../../hooks/useResponsive";

export function Builder() {
  const { state, actions } = useBuilder();
  const { isMobile } = useResponsive();
  const { currentStep, stepProducts, selectedItems } = state;

  const getStepSelectedCount = (stepId: number) => {
    const stepCategory = steps.find((s) => s.id === stepId)?.category;
    if (!stepCategory) return 0;

    return selectedItems.filter((item) => {
      const product = state.products.find((p) => p.id === item.productId);
      return product?.category === stepCategory && item.quantity > 0;
    }).length;
  };
  console.log("products", state?.products);

  const handleNextStep = () => {
    actions.nextStep();
  };

  return (
    <div className=" ">
      {/* Steps */}
      <div className="">
        {steps.map((step, index) => {
          const products = stepProducts[step.id] || [];
          const isOpen = currentStep === step.id;
          const selectedCount = getStepSelectedCount(step.id);
          const nextStepTitle = steps[index + 1]
            ? steps[index + 1].title
            : null;
          return (
            <div  className={(isOpen ? "bg-paper " :" ") + "  w-full rounded-10"} >
              <span
                className="semibold-400 p-4 text-text-title"
                style={{
                  fontFamily: "Gilroy-Medium, sans-serif",
                  fontWeight: 400,
                  fontSize: isMobile ? "10px" : "12px",
                  letterSpacing: "0px",
                  color: "#484848",
                  background: "#0B0D10",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                STEP {index + 1} OF {steps.length}
              </span>

              <AccordionStep
                key={step.id}
                stepNumber={index + 1}
                totalSteps={steps.length}
                title={step.title}
                nextStepTitle={nextStepTitle}
                category={step.category}
                isOpen={isOpen}
                selectedCount={selectedCount}
                totalItems={products.length}
                onToggle={() => actions.goToStep(step.id)} //TODO: update to toggle not just open
                onNext={index < steps.length - 1 ? handleNextStep : undefined}
              >
                <div className="w-full flex flex-wrap justify-center gap-4">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex-1 min-w-[calc(50%-0.5rem)] max-w-[calc(50%-0.5rem)]"
                    >
                      <ProductCard
                        key={product.id}
                        product={product}
                        selectedItems={selectedItems}
                        onVariantSelect={(variantId) =>
                          actions.selectVariant(product.id, variantId)
                        }
                        onQuantityChange={(variantId, quantity) =>
                          actions.updateQuantity(
                            product.id,
                            variantId,
                            quantity,
                          )
                        }
                      />
                    </div>
                  ))}
                </div>
              </AccordionStep>
            </div>
          );
        })}
      </div>
    </div>
  );
}
