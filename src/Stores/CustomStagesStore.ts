import { CustomStore } from './CustomStore';
import { Stage } from '../Domain';

class CustomStagesStore extends CustomStore<Stage[]>
{
	public addStages(stages: Stage[]) {
		this.set(stages);
	}

	public addStage(stage: Stage) {
		this.update((stages: Stage[]): Stage[] =>
			stages.find((stg) => stg.id === stage.id)
				? [...stages]
				: [...stages, stage]
		);
	}

	public removeStage(stage: Stage) {
		this.update((stages: Stage[]): Stage[] =>
			stages.filter((stg) => stg.id !== stage.id)
		);
	}

	public updateStage(stage: Stage) {
		this.update((stages: Stage[]): Stage[] =>
			stages.map((stg) => stg.id === stage.id
				? stage
				: stg
			)
		);
	}

	public removeStagesOfCategory(categoryId: number) {
		this.update((stages: Stage[]): Stage[] =>
			stages.filter((stg) => stg.categoryId !== categoryId)
		);
	}
}

export const customStagesStore = new CustomStagesStore([]);
